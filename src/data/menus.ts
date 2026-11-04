import type { MenuBoard } from '../types'

// 가게별 메뉴판. 키는 일정 데이터의 menuId·맛집 id와 맞춘다. load.ts가 API에서 받아 채운다
export const MENUS: Record<string, MenuBoard> = {}
