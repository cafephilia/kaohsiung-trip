// 오프라인 지원 서비스 워커.
// 페이지(HTML)는 인터넷이 되면 항상 새로 받고, 안 되면 저장본을 보여준다.
// 해시가 붙은 JS·CSS와 사진은 한 번 받으면 저장본을 쓴다.
const CACHE = 'kaohsiung-trip-v1'
const SCOPE = self.registration.scope

self.addEventListener('install', event => {
  self.skipWaiting()
  event.waitUntil(caches.open(CACHE).then(cache => cache.add(new Request(SCOPE, { cache: 'reload' }))))
})

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys()
    await Promise.all(keys.filter(k => k.startsWith('kaohsiung-trip-') && k !== CACHE).map(k => caches.delete(k)))
    await self.clients.claim()
  })())
})

self.addEventListener('fetch', event => {
  const req = event.request
  if (req.method !== 'GET') return
  const url = new URL(req.url)

  // 페이지 이동: 네트워크 우선, 실패하면 저장된 첫 화면
  if (req.mode === 'navigate' && req.url.startsWith(SCOPE)) {
    event.respondWith((async () => {
      try {
        const res = await fetch(req)
        const cache = await caches.open(CACHE)
        cache.put(SCOPE, res.clone())
        return res
      } catch {
        return (await caches.match(SCOPE)) || Response.error()
      }
    })())
    return
  }

  // 같은 사이트의 JS·CSS·사진·아이콘: 저장본 우선
  if (req.url.startsWith(SCOPE)) {
    event.respondWith((async () => {
      const hit = await caches.match(req)
      if (hit) return hit
      const res = await fetch(req)
      if (res.ok) (await caches.open(CACHE)).put(req, res.clone())
      return res
    })())
    return
  }

  // 글꼴 CDN: 저장본을 먼저 주고 뒤에서 갱신
  if (url.hostname === 'cdn.jsdelivr.net') {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE)
      const hit = await cache.match(req)
      const update = fetch(req).then(res => {
        if (res.ok || res.type === 'opaque') cache.put(req, res.clone())
        return res
      }).catch(() => hit)
      return hit || update
    })())
  }
})
