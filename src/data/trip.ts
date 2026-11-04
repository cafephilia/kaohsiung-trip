import type { CheckItem, Day, Embassy, Flight, Place, Stay, TipGroup } from '../types'

export { FIRST_TRIP_TIPS, PACKING, USEFUL_APPS } from './common'

// 일정·숙소·항공·교통 데이터. 내용은 Cloudflare D1에 있고(worker/seed/docs.json이 원본),
// 앱을 시작할 때 load.ts가 API에서 받아 아래 빈 그릇을 채운다. 화면은 채운 뒤에 그린다.

export const HOTEL = {} as Place
export const STAY = {} as Stay
export const HOTEL_FACTS: [string, string][] = []
export const FLIGHTS: Flight[] = []
export const FLIGHT_INCLUDES: string[] = []
export const DAYS: Day[] = []
export const CHECKLIST: CheckItem[] = []
export const BAGGAGE_SUMMARY: string[] = []
export const BAGGAGE: TipGroup[] = []
export const FARES: [string, string][] = []
export const FARE_NOTES: string[] = []
export const WALKS: [string, string][] = []
export const EVENTS: [string, string][] = []
export const WEATHER: string[] = []
export const CONTACTS: [string, string][] = []
export const EMBASSY = {} as Embassy
