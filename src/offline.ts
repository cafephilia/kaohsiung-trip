import { MARKET_PHOTOS, NIGHT_PHOTOS, PHOTOS, SPOT_PHOTOS } from './data/photos'

// public/sw.js의 CACHE와 같은 이름이어야 한다
const CACHE = 'kaohsiung-trip-v1'
const FONT_CSS = 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css'

/**
 * 서비스 워커를 등록하고, 첫 방문에서 화면에 쓰는 파일과 사진을 모두 저장해 둔다.
 * 첫 방문 때는 서비스 워커가 아직 요청을 가로채지 못하므로 페이지에서 직접 저장한다.
 */
export function setupOffline() {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator) || !('caches' in window)) return
  window.addEventListener('load', async () => {
    try {
      await navigator.serviceWorker.register(import.meta.env.BASE_URL + 'sw.js')
      await warmCache()
    } catch {
      /* 저장에 실패해도 앱은 온라인으로 계속 동작한다 */
    }
  })
}

async function warmCache() {
  const base = new URL(import.meta.env.BASE_URL, location.href).href
  const pageFiles = [...document.querySelectorAll<HTMLScriptElement | HTMLLinkElement>('script[src], link[rel="stylesheet"], link[rel="manifest"], link[rel="apple-touch-icon"]')]
    .map(el => ('src' in el && el.src) || (el as HTMLLinkElement).href)
    .filter(u => u.startsWith(base))
  const photos = [...Object.values(PHOTOS), ...Object.values(SPOT_PHOTOS), ...Object.values(NIGHT_PHOTOS), ...Object.values(MARKET_PHOTOS)].map(p => new URL(p.src, location.href).href)
  const urls = [...new Set([...pageFiles, base + 'icons/icon-192.png', ...photos, FONT_CSS])]

  const cache = await caches.open(CACHE)
  // 사진이 많으니 몇 개씩 나눠 받는다
  for (let i = 0; i < urls.length; i += 6) {
    await Promise.all(urls.slice(i, i + 6).map(async u => {
      if (await cache.match(u)) return
      try {
        await cache.add(u)
      } catch {
        /* 하나 실패해도 나머지는 계속 */
      }
    }))
  }
}
