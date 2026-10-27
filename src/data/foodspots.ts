import type { FoodSpot } from '../types'
import { addKrw } from '../utils'
import raw from './foodspots.json'

addKrw(raw)

// 해산물 중심의 가오슝 맛집. 2026-10 조사 기준
export const FOOD_SPOTS = raw as FoodSpot[]

