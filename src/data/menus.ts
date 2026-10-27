import type { MenuBoard } from '../types'
import raw from './menus.json'

// 가게별 메뉴판. 키는 일정 데이터의 menuId와 맞춘다.
// 2026-10 조사 기준이며 가격 출처와 기준은 각 메뉴판의 note·sources에 있다
export const MENUS = raw as Record<string, MenuBoard>
