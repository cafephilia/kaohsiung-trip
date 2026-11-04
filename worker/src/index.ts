// 가오슝 여행 앱 API. D1의 데이터를 한 번에 내려주고, R2의 사진을 내려준다.
// 모두 공개 데이터라 읽기 전용이고 인증이 없다. 데이터 수정은 seed 스크립트로 한다.

interface D1Result<T> { results: T[] }
interface D1Statement { all<T>(): Promise<D1Result<T>> }
interface D1Database { prepare(sql: string): D1Statement; batch<T>(s: D1Statement[]): Promise<D1Result<T>[]> }
interface R2Object { body: ReadableStream; httpEtag: string; writeHttpMetadata(h: Headers): void }
interface R2Bucket { get(key: string): Promise<R2Object | null> }

interface Env {
  DB: D1Database
  PHOTOS: R2Bucket
}

interface PhotoRow { key: string; file: string; author: string; license: string; license_url: string; source: string; example: string | null }

const CORS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS' }

const json = (body: unknown, maxAge: number) =>
  new Response(JSON.stringify(body), {
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': `public, max-age=${maxAge}`, ...CORS },
  })

/** 데이터 안의 { $photo: 키 }를 앱이 쓰는 Photo 객체로 바꾼다 */
function resolvePhotos(v: unknown, photos: Map<string, object>): unknown {
  if (Array.isArray(v)) return v.map(x => resolvePhotos(x, photos))
  if (v && typeof v === 'object') {
    const ref = (v as { $photo?: string }).$photo
    if (ref) return photos.get(ref) ?? null
    return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, resolvePhotos(x, photos)]))
  }
  return v
}

async function loadData(env: Env, origin: string) {
  const [docs, days, spots, menus, photos] = await env.DB.batch<Record<string, string>>([
    env.DB.prepare('SELECT key, data FROM docs'),
    env.DB.prepare('SELECT data FROM days ORDER BY sort'),
    env.DB.prepare('SELECT data FROM spots ORDER BY sort'),
    env.DB.prepare('SELECT id, data FROM menus'),
    env.DB.prepare('SELECT * FROM photos'),
  ])
  const photoMap = new Map<string, object>()
  for (const p of photos.results as unknown as PhotoRow[]) {
    photoMap.set(p.key, {
      src: `${origin}/photos/${encodeURIComponent(p.file)}`,
      author: p.author, license: p.license, licenseUrl: p.license_url, source: p.source,
      ...(p.example ? { example: p.example } : {}),
    })
  }
  const parse = (s: string) => resolvePhotos(JSON.parse(s), photoMap)
  return {
    docs: Object.fromEntries(docs.results.map(r => [r.key, parse(r.data)])),
    days: days.results.map(r => parse(r.data)),
    spots: spots.results.map(r => parse(r.data)),
    menus: Object.fromEntries(menus.results.map(r => [r.id, JSON.parse(r.data)])),
    photos: [...photoMap.values()],
  }
}

async function photo(env: Env, file: string) {
  const obj = await env.PHOTOS.get(file)
  if (!obj) return new Response('not found', { status: 404, headers: CORS })
  const headers = new Headers(CORS)
  obj.writeHttpMetadata(headers)
  headers.set('ETag', obj.httpEtag)
  headers.set('Cache-Control', 'public, max-age=604800')
  return new Response(obj.body, { headers })
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    if (req.method === 'OPTIONS') return new Response(null, { headers: CORS })
    if (req.method !== 'GET') return new Response('method not allowed', { status: 405, headers: CORS })
    const url = new URL(req.url)
    if (url.pathname === '/v1/data') return json(await loadData(env, url.origin), 60)
    if (url.pathname.startsWith('/photos/')) return photo(env, decodeURIComponent(url.pathname.slice('/photos/'.length)))
    return new Response('not found', { status: 404, headers: CORS })
  },
}
