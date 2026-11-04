// seed/*.json을 D1에 넣는 SQL(seed.sql)로 바꾼다. 표를 지우고 다시 만드니 언제 돌려도 결과가 같다
import fs from 'node:fs'

const dir = new URL('..', import.meta.url)
const read = name => JSON.parse(fs.readFileSync(new URL(`seed/${name}.json`, dir), 'utf8'))
const q = v => (v == null ? 'NULL' : `'${String(v).replace(/'/g, "''")}'`)
const j = v => q(JSON.stringify(v))

const docs = read('docs')
const { days, ...rest } = docs
const spots = read('spots')
const menus = read('menus')
const photos = read('photos')

const sql = [fs.readFileSync(new URL('schema.sql', dir), 'utf8')]
for (const [key, data] of Object.entries(rest)) sql.push(`INSERT INTO docs (key, data) VALUES (${q(key)}, ${j(data)});`)
days.forEach((d, i) => sql.push(`INSERT INTO days (id, sort, data) VALUES (${q(d.id)}, ${i}, ${j(d)});`))
spots.forEach((s, i) => sql.push(`INSERT INTO spots (id, sort, data) VALUES (${q(s.id)}, ${i}, ${j(s)});`))
for (const [id, data] of Object.entries(menus)) sql.push(`INSERT INTO menus (id, data) VALUES (${q(id)}, ${j(data)});`)
for (const p of photos) {
  sql.push(`INSERT INTO photos (key, file, author, license, license_url, source, example) VALUES (${[p.key, p.file, p.author, p.license, p.licenseUrl, p.source, p.example].map(q).join(', ')});`)
}

fs.writeFileSync(new URL('seed.sql', dir), sql.join('\n') + '\n')
console.log(`seed.sql: docs ${Object.keys(rest).length}, days ${days.length}, spots ${spots.length}, menus ${Object.keys(menus).length}, photos ${photos.length}`)
