import type { InjectionKey } from 'vue'
import type { MenuBoard, Place } from './types'

export const mapUrl = (q: string) =>
  'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q)

/** 구글 지도 길찾기. 휴대폰 브라우저는 경유지를 3개까지만 받으니 그보다 많이 넣지 않는다 */
export const dirUrl = (stops: string[]) => {
  const p = new URLSearchParams({ api: '1', origin: stops[0], destination: stops[stops.length - 1] })
  if (stops.length > 2) p.set('waypoints', stops.slice(1, -1).join('|'))
  return 'https://www.google.com/maps/dir/?' + p
}

const pad = (n: number) => String(n).padStart(2, '0')

export const localDate = (d = new Date()) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

export const toMinutes = (t: string) => {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

/** '180' → 'NT$180', '+30'(추가 요금) → '+NT$30', '시가'·'미확인'은 그대로 */
export const formatTwd = (y: string) => {
  if (!/\d/.test(y)) return y
  return y.startsWith('+') ? '+NT$' + y.slice(1) : 'NT$' + y
}

/** 사파리 비공개 모드 등에서 localStorage 접근이 실패해도 앱은 동작해야 한다 */
export const store = {
  get(key: string): string | null {
    try {
      return localStorage.getItem(key)
    } catch {
      return null
    }
  },
  set(key: string, value: string) {
    try {
      localStorage.setItem(key, value)
    } catch {
      /* 저장 실패는 무시 */
    }
  },
}

export const openTaxiKey: InjectionKey<(place: Place) => void> = Symbol('openTaxi')

export const openMenuKey: InjectionKey<(menu: MenuBoard) => void> = Symbol('openMenu')

export const openPackKey: InjectionKey<() => void> = Symbol('openPack')

export const openBaggageKey: InjectionKey<() => void> = Symbol('openBaggage')

/** 출발 전 체크리스트와 짐 목록의 체크 상태 저장 키 */
export const checkKey = (id: string) => 'khh-ck-' + id
