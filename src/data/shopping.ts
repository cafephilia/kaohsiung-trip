import type { ShopItem, ShopPlace } from '../types'
import { addKrw } from '../utils'
import raw from './shopping.json'

addKrw(raw)

// 쇼핑 탭: 기념품·가게·편의점·대만 술. 2026-11 조사 기준이고 가격 출처는 각 항목의 sources에 있다
export const SOUVENIRS = raw.souvenirs as ShopItem[]
export const SHOP_PLACES = raw.shops as ShopPlace[]
export const SHOP_TIPS: string[] = raw.shopTips
export const CVS_ITEMS = raw.cvs as ShopItem[]
export const DRINKS = raw.drinks as ShopItem[]
export const DRINK_TIPS: string[] = raw.drinkTips
