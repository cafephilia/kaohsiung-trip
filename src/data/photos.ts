import type { Photo } from '../types'

// 위키미디어 커먼즈 사진. 파일은 Cloudflare R2에, 작가·라이선스는 D1에 있고 load.ts가 채운다.
// src는 API의 /photos/ 주소다

/** 맛집 탭 사진. 키는 맛집 id */
export const SPOT_PHOTOS: Record<string, Photo> = {}
/** 야시장 탭 음식 사진. 키는 NIGHT_FOODS의 zh */
export const NIGHT_PHOTOS: Record<string, Photo> = {}
/** 야시장 카드 사진. 키는 NIGHT_MARKETS의 id */
export const MARKET_PHOTOS: Record<string, Photo> = {}
/** 오프라인 저장용 전체 사진 목록 */
export const ALL_PHOTOS: Photo[] = []
