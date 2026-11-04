import type { Day, FoodSpot, MenuBoard, Photo } from '../types'
import { addKrw, store } from '../utils'
import * as common from './common'
import { FOOD_SPOTS } from './foodspots'
import { MENUS } from './menus'
import * as night from './night'
import * as photos from './photos'
import * as shopping from './shopping'
import * as trip from './trip'

/** Cloudflare Worker 주소. 데이터는 D1, 사진은 R2에서 온다 */
export const API_BASE = import.meta.env.VITE_API_BASE || 'https://khh-api.cafephilia.workers.dev'

// 마지막으로 받은 데이터. 인터넷이 없을 때 이걸로 화면을 그린다
const CACHE_KEY = 'khh-data-v1'
const TIMEOUT_MS = 8000

interface Payload {
  docs: Record<string, unknown>
  days: Day[]
  spots: FoodSpot[]
  menus: Record<string, MenuBoard>
  photos: Photo[]
}

async function fetchPayload(): Promise<Payload> {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(API_BASE + '/v1/data', { signal: ctrl.signal })
    if (!res.ok) throw new Error('HTTP ' + res.status)
    return await res.json()
  } finally {
    clearTimeout(timer)
  }
}

/** 빈 그릇(배열·객체)을 받은 데이터로 채운다. 그릇 자체를 바꾸지 않아야 다른 모듈의 import가 그대로 산다 */
function fill(target: object, value: unknown) {
  if (Array.isArray(target)) target.splice(0, target.length, ...(value as unknown[]))
  else Object.assign(target, value)
}

// docs의 키 → 채울 그릇
const SLOTS: Record<string, object> = {
  hotel: trip.HOTEL, stay: trip.STAY, hotelFacts: trip.HOTEL_FACTS,
  flights: trip.FLIGHTS, flightIncludes: trip.FLIGHT_INCLUDES, checklist: trip.CHECKLIST,
  baggageSummary: trip.BAGGAGE_SUMMARY, baggage: trip.BAGGAGE,
  fares: trip.FARES, fareNotes: trip.FARE_NOTES, walks: trip.WALKS,
  events: trip.EVENTS, weather: trip.WEATHER, contacts: trip.CONTACTS, embassy: trip.EMBASSY,
  packing: common.PACKING, firstTripTips: common.FIRST_TRIP_TIPS, usefulApps: common.USEFUL_APPS,
  tripNights: night.TRIP_NIGHTS, nightMarkets: night.NIGHT_MARKETS, nightFoods: night.NIGHT_FOODS,
  nightPhrases: night.NIGHT_PHRASES, nightTips: night.NIGHT_TIPS,
  spotPhotos: photos.SPOT_PHOTOS, nightPhotos: photos.NIGHT_PHOTOS, marketPhotos: photos.MARKET_PHOTOS,
  souvenirs: shopping.SOUVENIRS, shopPlaces: shopping.SHOP_PLACES, shopTips: shopping.SHOP_TIPS,
  cvsItems: shopping.CVS_ITEMS, drinks: shopping.DRINKS, drinkTips: shopping.DRINK_TIPS,
  whiskies: shopping.WHISKIES, whiskyTips: shopping.WHISKY_TIPS, whiskyBaskets: shopping.WHISKY_BASKETS,
}

function apply(p: Payload) {
  for (const [key, slot] of Object.entries(SLOTS)) if (key in p.docs) fill(slot, p.docs[key])
  fill(trip.DAYS, p.days)
  fill(FOOD_SPOTS, p.spots)
  fill(MENUS, p.menus)
  fill(photos.ALL_PHOTOS, p.photos)
  // 글 속 NT$ 금액에 원화를 붙인다. 사진 정보는 건드리지 않는다
  const photoSlots: object[] = Object.values(photos)
  addKrw(...Object.values(SLOTS).filter(s => !photoSlots.includes(s)), trip.DAYS, FOOD_SPOTS, MENUS)
}

/**
 * 앱 데이터를 API에서 받아 채운다. 실패하면 마지막으로 받은 저장본을 쓴다.
 * 둘 다 없으면(첫 방문인데 인터넷이 안 될 때) 에러를 던진다.
 */
export async function loadData(): Promise<void> {
  let payload: Payload
  try {
    payload = await fetchPayload()
    store.set(CACHE_KEY, JSON.stringify(payload))
  } catch (err) {
    const saved = store.get(CACHE_KEY)
    if (!saved) throw err
    payload = JSON.parse(saved)
  }
  apply(payload)
}
