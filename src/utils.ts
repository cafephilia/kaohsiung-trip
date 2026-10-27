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
  if (!/^\+?\d/.test(y)) return y
  return y.startsWith('+') ? '+NT$' + y.slice(1) : 'NT$' + y
}

/** 원화 환산에 쓰는 환율. 2026-10-27 기준 1 NT$ ≈ 40.7원이고, 환전 수수료를 생각해 41원으로 잡는다 */
export const KRW_PER_TWD = 41

/** 대만달러 금액(문자열)을 어림한 원화 금액으로. 큰 금액일수록 크게 반올림한다 */
const toKrw = (twd: string, scale = 1) => {
  const won = Number(twd.replace(/,/g, '')) * scale * KRW_PER_TWD
  const step = won < 1000 ? 10 : won < 10000 ? 100 : won < 100000 ? 1000 : 10000
  const r = Math.round(won / step) * step
  return r >= 1000000 ? (r / 10000).toLocaleString('ko-KR') + '만' : r.toLocaleString('ko-KR')
}

// '150', '1,200'처럼 숫자로 끝나는 수 하나. 'NT$275,'의 뒤 쉼표는 문장 부호다
const NUM = String.raw`\d{1,3}(?:,\d{3})+|\d+`
const NUMS = new RegExp(NUM, 'g')
// '150', '60–80', '270/440/660', '+25' 같은 금액 부분
const AMOUNT = String.raw`(?:${NUM})(?:\s?[–~\-/]\s?(?:${NUM}))*`
const HEAD = new RegExp(`^(\\+?)(${AMOUNT})\\s*(~|미만|이상)?`)

/** formatTwd로 보여주는 금액 옆에 붙일 원화. '150 (대)' → '약 6,200원', 숫자로 시작하지 않으면 '' */
export const twdKrw = (y: string) => {
  const m = HEAD.exec(y)
  if (!m) return ''
  const [, plus, amount, tail] = m
  // 사이즈별 가격은 좁은 화면에서 '/' 뒤에서 줄을 바꿀 수 있게 한다
  const won = amount.replace(NUMS, n => toKrw(n)).replace(/\//g, '/​')
  return `${plus ? '+' : '약 '}${won}원${tail === '~' ? '~' : tail ? ' ' + tail : ''}`
}

const INLINE = new RegExp(`NT\\$\\s?(${AMOUNT})(만)?(/[가-힣]{1,2}(?![가-힣]))?`, 'g')

/** 글 속의 'NT$150' 뒤에 '(약 6,200원)'을 붙인다 */
export const withKrw = (text: string) =>
  text.replace(INLINE, (all, amount: string, man?: string) =>
    `${all} (약 ${amount.replace(NUMS, n => toKrw(n, man ? 10000 : 1))}원)`)

// 여러 곳에서 함께 쓰는 객체에 원화를 두 번 붙이지 않도록 기억해 둔다
const krwDone = new WeakSet<object>()

/** 데이터 속 글의 NT$ 금액마다 원화를 붙인다(제자리에서 바꾼다). 데이터 파일 끝에서 부른다 */
export const addKrw = (...data: object[]) => {
  const walk = (o: Record<string, unknown>) => {
    if (krwDone.has(o)) return
    krwDone.add(o)
    for (const k of Object.keys(o)) {
      const v = o[k]
      if (typeof v === 'string') {
        if (v.includes('NT$')) o[k] = withKrw(v)
      } else if (v && typeof v === 'object') {
        walk(v as Record<string, unknown>)
      }
    }
  }
  data.forEach(d => walk(d as Record<string, unknown>))
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
