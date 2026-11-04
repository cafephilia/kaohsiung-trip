import { ALL_PHOTOS } from './data/photos'

// public/sw.js의 CACHE와 같은 이름이어야 한다
const CACHE = 'kaohsiung-trip-v2'
const FONT_CSS = 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css'

/**
 * 서비스 워커를 등록하고, 첫 방문에서 화면에 쓰는 파일과 사진을 모두 저장해 둔다.
 * 첫 방문 때는 서비스 워커가 아직 요청을 가로채지 못하므로 페이지에서 직접 저장한다.
 * 데이터(JSON)는 load.ts가 localStorage에 따로 저장한다.
 */
export function setupOffline() {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator) || !('caches' in window)) return
  const run = async () => {
    try {
      await navigator.serviceWorker.register(import.meta.env.BASE_URL + 'sw.js')
      await warmCache()
    } catch {
      /* 저장에 실패해도 앱은 온라인으로 계속 동작한다 */
    }
  }
  // 데이터를 받은 뒤에 불리므로 load 이벤트가 이미 지났을 수 있다
  if (document.readyState === 'complete') run()
  else window.addEventListener('load', run)
}

async function warmCache() {
  const base = new URL(import.meta.env.BASE_URL, location.href).href
  // 나중에 불러온 JS 조각까지 잡으려고 실제로 받은 파일 목록을 쓴다
  const pageFiles = [
    ...document.querySelectorAll<HTMLScriptElement | HTMLLinkElement>('script[src], link[rel="stylesheet"], link[rel="manifest"], link[rel="apple-touch-icon"]'),
  ].map(el => ('src' in el && el.src) || (el as HTMLLinkElement).href)
  const loaded = performance.getEntriesByType('resource').map(e => e.name)
  const sameSite = [...pageFiles, ...loaded].filter(u => u.startsWith(base) && /\.(js|css|png|svg|webmanifest)$/.test(new URL(u).pathname))
  const photos = ALL_PHOTOS.map(p => p.src)
  const urls = [...new Set([...sameSite, base + 'icons/icon-192.png', ...photos, FONT_CSS])]

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
