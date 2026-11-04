// photos/ 폴더의 사진을 R2 버킷에 올린다. 이름이 같으면 덮어쓴다. 사진 하나만 올리려면 파일 이름을 인자로 준다
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

const BUCKET = 'khh-trip-photos'
const dir = new URL('../photos/', import.meta.url)
const files = process.argv.slice(2).length ? process.argv.slice(2) : fs.readdirSync(dir).filter(f => /\.(jpe?g|png|webp)$/i.test(f))
const type = f => (/\.png$/i.test(f) ? 'image/png' : /\.webp$/i.test(f) ? 'image/webp' : 'image/jpeg')
const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx'

for (const f of files) {
  execFileSync(npx, ['wrangler', 'r2', 'object', 'put', `${BUCKET}/${f}`, '--file', fileURLToPath(new URL(f, dir)), '--content-type', type(f), '--remote'], { stdio: ['ignore', 'ignore', 'inherit'], shell: process.platform === 'win32' })
  console.log('uploaded', f)
}
