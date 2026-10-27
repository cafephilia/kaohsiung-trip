<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { Map as LeafletMap } from 'leaflet'
import { WAY_LABEL, type Day, type Kind, type LatLng, type Path, type PathMode } from '../types'
import { dirUrl, store } from '../utils'

const props = defineProps<{ day: Day }>()
const emit = defineEmits<{ focus: [index: number] }>()

interface Stop {
  pos: LatLng
  t: string
  title: string
  kind: Kind
  /** 구글 지도 길찾기에 넣을 장소 */
  query: string
  /** day.items 안의 위치 */
  index: number
  /** 앞 장소에서 여기까지 역·정류장 단위 경로 */
  path?: Path
  /** 경로를 글로 줄인 것. 예: ['도보', '메이리다오역', '오렌지라인 3정거장', '시즈완역', '도보'] */
  via: string[]
}

const modeLabel = (m: PathMode, passed: number) =>
  m.mode === 'subway' && m.line ? `${m.line} ${passed + 1}정거장` : m.line ?? WAY_LABEL[m.mode]

/** 지나가는 역은 빼고, 지하철은 몇 정거장인지 붙인다 */
function describe(path: Path): string[] {
  const parts: string[] = []
  let mode: PathMode | undefined
  let passed = 0
  for (const el of path) {
    if (!('pos' in el)) {
      mode = el
      passed = 0
    } else if (el.pass) {
      passed++
    } else {
      if (mode) parts.push(modeLabel(mode, passed))
      parts.push(el.name)
      mode = undefined
    }
  }
  if (mode) parts.push(modeLabel(mode, passed))
  return parts
}

/**
 * 위치가 있는 일정을 순서대로 모으고, 같은 곳에 이어지는 일정은 하나로 합친다.
 * 위치 없는 이동 일정에 적힌 경로는 다음 장소로 가는 경로로 본다
 */
const stops = computed(() => {
  const out: Stop[] = []
  let pending: Path = []
  props.day.items.forEach((it, index) => {
    if (it.path) pending = [...pending, ...it.path]
    if (!it.pos) return
    const prev = out[out.length - 1]
    if (prev && prev.pos[0] === it.pos[0] && prev.pos[1] === it.pos[1]) {
      pending = []
      return
    }
    const path = prev && pending.length ? pending : undefined
    out.push({
      pos: it.pos, t: it.t, title: it.title, kind: it.k, query: it.map ?? it.pos.join(','), index,
      path, via: path ? describe(path) : [],
    })
    pending = []
  })
  return out
})

/** 이날 지도에 나오는 선 종류만 범례로 보여준다 */
const legend = computed(() => {
  const out = new Map<string, { label: string; kind: string; color: string }>()
  for (const s of stops.value.slice(1)) {
    if (!s.path) {
      out.set('other', { label: '그 밖의 이동', kind: 'dashed', color: 'var(--accent)' })
      continue
    }
    for (const el of s.path) {
      if ('pos' in el) continue
      if (el.mode === 'walk') out.set('walk', { label: '도보', kind: 'dotted', color: 'var(--muted)' })
      else {
        const fallback = el.mode === 'subway' ? 'var(--k-flight)' : el.mode === 'bus' ? 'var(--k-food)' : 'var(--k-stay)'
        const label = el.line ?? WAY_LABEL[el.mode]
        out.set(label, { label, kind: 'solid', color: el.color ?? fallback })
      }
    }
  }
  return [...out.values()]
})

/** 출발·도착 + 경유지 3곳씩 끊고, 다음 구간은 앞 구간의 도착지에서 시작한다 */
const links = computed(() => {
  const s = stops.value
  const out: { url: string; label: string }[] = []
  for (let i = 0; i < s.length - 1; i += 4) {
    const part = s.slice(i, i + 5)
    out.push({ url: dirUrl(part.map(p => p.query)), label: `${part[0].t}–${part[part.length - 1].t}` })
  }
  return out
})

const OPEN_KEY = 'khh-map-open'
const open = ref(store.get(OPEN_KEY) !== '0')
const canvas = ref<HTMLDivElement>()
const failed = ref(false)
let map: LeafletMap | undefined

/** 지도를 처음 펼칠 때 Leaflet을 불러온다. 지도를 안 보는 사람은 내려받지 않는다 */
async function draw() {
  if (map || !canvas.value) return
  try {
    const [{ default: L }] = await Promise.all([import('leaflet'), import('leaflet/dist/leaflet.css')])
    if (map || !canvas.value) return
    const css = getComputedStyle(document.documentElement)
    const color = (k: string) => css.getPropertyValue('--k-' + k).trim()

    map = L.map(canvas.value, {
      scrollWheelZoom: false,
      // 휴대폰에서는 한 손가락으로 페이지를 내리고, 두 손가락으로 지도를 움직인다
      dragging: !L.Browser.mobile,
      attributionControl: true,
    })
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map)

    const varColor = (name: string) => css.getPropertyValue(name).trim()
    /** 걷기는 회색 점선, 지하철은 노선 색, 버스·전철은 종류 색, 경로를 모르는 구간은 녹색 파선 */
    const lineStyle = (m?: PathMode) => {
      if (!m) return { color: varColor('--accent'), weight: 3, opacity: .75, dashArray: '6 7' }
      if (m.mode === 'walk') return { color: varColor('--muted'), weight: 3, opacity: .9, dashArray: '1 6', lineCap: 'round' as const }
      if (m.mode === 'subway') return { color: m.color ?? varColor('--k-flight'), weight: 5, opacity: .9 }
      if (m.mode === 'bus') return { color: m.color ?? varColor('--k-food'), weight: 4, opacity: .85 }
      return { color: m.color ?? varColor('--k-stay'), weight: 4, opacity: .85 }
    }

    const pts: LatLng[] = []
    stops.value.forEach((s, i) => {
      pts.push(s.pos)
      if (i === 0) return
      const from = stops.value[i - 1].pos
      if (!s.path) {
        L.polyline([from, s.pos], lineStyle()).addTo(map!)
        return
      }
      // 수단이 바뀌거나 내리는 역에서 선을 끊고, 지나가는 역은 같은 선에 잇는다
      let mode: PathMode | undefined
      let line: LatLng[] = [from]
      for (const el of s.path) {
        if (!('pos' in el)) {
          mode = el
          continue
        }
        line.push(el.pos)
        pts.push(el.pos)
        if (el.pass) continue
        L.polyline(line, lineStyle(mode)).addTo(map!)
        line = [el.pos]
      }
      line.push(s.pos)
      L.polyline(line, lineStyle(mode)).addTo(map!)

      // 역·정류장 점. 타고 내리는 역은 크게, 지나가는 역은 작게, 테두리는 그 역을 지나는 노선 색
      const path = s.path
      const rideAt = (j: number, step: 1 | -1) => {
        for (let k = j + step; k >= 0 && k < path.length; k += step) {
          const el = path[k]
          if (!('pos' in el)) return el.mode === 'walk' ? undefined : el
        }
      }
      path.forEach((el, j) => {
        if (!('pos' in el)) return
        const ride = rideAt(j, -1) ?? rideAt(j, 1)
        const c = ride ? lineStyle(ride).color : varColor('--muted')
        L.circleMarker(el.pos, {
          radius: el.pass ? 3 : 5, color: c, weight: 2, fillColor: '#fff', fillOpacity: 1,
        }).bindPopup(el.name).addTo(map!)
      })
    })

    stops.value.forEach((s, i) => {
      const icon = L.divIcon({
        className: 'stop-pin',
        html: `<span style="background:${color(s.kind)}">${i + 1}</span>`,
        iconSize: [26, 26],
        iconAnchor: [13, 13],
      })
      const popup = document.createElement('div')
      popup.className = 'stop-pop'
      popup.innerHTML = '<b></b> <span></span>'
      popup.querySelector('b')!.textContent = s.t
      popup.querySelector('span')!.textContent = s.title
      // 메이리다오처럼 장소가 몰린 곳은 핀이 겹치니, 핀을 누르면 그 주변으로 확대한다
      L.marker(s.pos, { icon, title: `${i + 1}. ${s.title}` })
        .bindPopup(popup)
        .on('click', () => map!.setView(s.pos, Math.max(map!.getZoom(), 15)))
        .addTo(map!)
    })
    map.fitBounds(L.latLngBounds(pts), { padding: [28, 28], maxZoom: 15 })
  } catch {
    failed.value = true
  }
}

function onToggle(e: Event) {
  open.value = (e.target as HTMLDetailsElement).open
  store.set(OPEN_KEY, open.value ? '1' : '0')
  if (open.value) {
    if (map) map.invalidateSize()
    else draw()
  }
}

onMounted(() => {
  if (open.value) draw()
})
onBeforeUnmount(() => map?.remove())
</script>

<template>
  <details v-if="stops.length > 1" class="box daymap" :open="open" @toggle="onToggle">
    <summary>
      <svg class="dm-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" /><path d="M9 4v14M15 6v14" />
      </svg>
      <span class="tg-title">동선 지도</span>
      <span class="tg-count">{{ stops.length }}곳</span>
      <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </summary>
    <div class="dm-body">
      <div ref="canvas" class="dm-canvas" role="img" :aria-label="day.label + ' 동선 지도'"></div>
      <p v-if="failed" class="dm-note">지도를 불러오지 못했어요. 인터넷에 연결된 뒤 다시 열어 주세요.</p>
      <ul class="dm-legend" aria-label="선 종류">
        <li v-for="lg in legend" :key="lg.label">
          <i :class="lg.kind" :style="{ '--c': lg.color }"></i>{{ lg.label }}
        </li>
      </ul>
      <ol class="stops">
        <li v-for="(s, i) in stops" :key="s.index">
          <button type="button" @click="emit('focus', s.index)">
            <span class="stop-no" :style="{ background: `var(--k-${s.kind})` }">{{ i + 1 }}</span>
            <span class="stop-t">{{ s.t }}</span>
            <span class="stop-title">{{ s.title }}</span>
            <span v-if="s.via.length" class="stop-via">{{ s.via.join(' → ') }}</span>
          </button>
        </li>
      </ol>
      <div class="actions">
        <a v-for="l in links" :key="l.url" class="btn solid" :href="l.url" target="_blank" rel="noopener">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M3 13c0-4 2-6 6-6h4M10 4l3 3-3 3" />
          </svg>
          구글 지도 길찾기
          <span v-if="links.length > 1" class="dm-range">{{ l.label }}</span>
        </a>
      </div>
      <p class="dm-note">
        역과 역 사이는 직선으로 이어서 실제 길과는 달라요. 실제 길은 구글 지도 길찾기에서 보세요. 지도 그림은 인터넷이 있어야 보여요.
      </p>
    </div>
  </details>
</template>
