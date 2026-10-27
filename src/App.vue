<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue'
import { DAYS, FLIGHTS, HOTEL, STAY } from './data/trip'
import type { MenuBoard, Place } from './types'
import { localDate, mapUrl, openBaggageKey, openMenuKey, openPackKey, openTaxiKey, store } from './utils'
import DayView from './components/DayView.vue'
import FoodView from './components/FoodView.vue'
import NightView from './components/NightView.vue'
import InfoView from './components/InfoView.vue'
import MenuSheet from './components/MenuSheet.vue'
import PackSheet from './components/PackSheet.vue'
import BaggageSheet from './components/BaggageSheet.vue'
import TaxiCard from './components/TaxiCard.vue'

const TAB_KEY = 'khh-tab'
const today = localDate()

const tabs = [
  ...DAYS.map(d => ({ id: d.id, label: d.label, short: d.short, isToday: d.date === today })),
  { id: 'food', label: '맛집', short: '해산물', isToday: false },
  { id: 'night', label: '야시장', short: '먹거리', isToday: false },
  { id: 'info', label: '정보', short: '준비', isToday: false },
]
const isTab = (id: string | null): id is string => !!id && tabs.some(t => t.id === id)

/** 주소의 #d2 같은 해시 → 여행 당일 → 마지막으로 본 탭 → 1일차 */
function initialTab(): string {
  const hash = location.hash.slice(1)
  if (isTab(hash)) return hash
  const todayDay = DAYS.find(d => d.date === today)
  if (todayDay) return todayDay.id
  const saved = store.get(TAB_KEY)
  return isTab(saved) ? saved : 'd1'
}

const active = ref(initialTab())
const activeDay = computed(() => DAYS.find(d => d.id === active.value))

/** 출발 전에는 D-day, 여행 중에는 몇 일차인지, 다녀온 뒤에는 완료 표시 */
const tripStatus = (() => {
  const DAY_MS = 86_400_000
  const t = Date.parse(today)
  const start = Date.parse(DAYS[0].date)
  const end = Date.parse(DAYS[DAYS.length - 1].date)
  if (t < start) return `D-${Math.round((start - t) / DAY_MS)}`
  if (t <= end) return `여행 ${Math.round((t - start) / DAY_MS) + 1}일차`
  return '다녀왔어요'
})()

// 탭을 누르면 주소의 해시도 맞춰 둔다. replaceState는 hashchange를 일으키지 않고 방문 기록도 쌓지 않는다
watch(active, id => {
  store.set(TAB_KEY, id)
  if (location.hash.slice(1) !== id) history.replaceState(null, '', '#' + id)
  window.scrollTo({ top: 0 })
})

const onHashChange = () => {
  const hash = location.hash.slice(1)
  if (isTab(hash)) active.value = hash
}

const taxi = ref<Place | null>(null)
provide(openTaxiKey, place => {
  taxi.value = place
})

const menu = ref<MenuBoard | null>(null)
provide(openMenuKey, board => {
  menu.value = board
})

const packOpen = ref(false)
provide(openPackKey, () => {
  packOpen.value = true
})

const baggageOpen = ref(false)
provide(openBaggageKey, () => {
  baggageOpen.value = true
})

const onKey = (e: KeyboardEvent) => {
  if (e.key !== 'Escape') return
  taxi.value = null
  menu.value = null
  // 짐 목록 위에 수하물 규정을 열었으면 위에 있는 것부터 닫는다
  if (baggageOpen.value) baggageOpen.value = false
  else packOpen.value = false
}
onMounted(() => {
  document.addEventListener('keydown', onKey)
  window.addEventListener('hashchange', onHashChange)
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKey)
  window.removeEventListener('hashchange', onHashChange)
})
</script>

<template>
  <div class="wrap">
    <header class="hero">
      <div class="hero-top">
        <span class="dday">{{ tripStatus }}</span>
        <span>2026.12.10 – 12.13 · 2명</span>
      </div>
      <h1>가오슝</h1>
      <p class="hero-sub">항구 도시에서 해산물과 야시장, 3박 4일</p>
      <div class="hero-flights">
        <div v-for="f in FLIGHTS" :key="f.code" class="hero-flight">
          <span class="hf-code">{{ f.code }}</span>
          <span class="hf-route">{{ f.from.code }} {{ f.from.time }} → {{ f.to.code }}</span>
          <span class="hf-date">{{ f.date }}</span>
        </div>
      </div>
      <div class="hero-stay">
        <div class="hs-head">
          <span class="hs-label">숙소</span>
          <span class="hs-nights">{{ STAY.nights }}</span>
        </div>
        <div class="hs-name">{{ STAY.name }}</div>
        <div class="hs-addr zh">{{ HOTEL.addr }}</div>
        <div class="hs-meta">체크인 {{ STAY.checkIn }} · 체크아웃 {{ STAY.checkOut }} · {{ STAY.station }}</div>
        <div class="hs-actions">
          <a class="hs-btn" :href="mapUrl(STAY.map)" target="_blank" rel="noopener">지도</a>
          <button class="hs-btn" type="button" @click="taxi = HOTEL">택시용 주소</button>
          <a class="hs-btn" :href="'tel:' + HOTEL.tel">전화</a>
        </div>
      </div>
    </header>

    <main id="view">
      <DayView v-if="activeDay" :key="activeDay.id" :day="activeDay" />
      <FoodView v-else-if="active === 'food'" />
      <NightView v-else-if="active === 'night'" />
      <InfoView v-else />
    </main>

    <p class="foot">
      정보 확인일 2026-10-27. 영업시간·가격은 바뀔 수 있으니 방문 전에 지도 링크에서 한 번 더 확인하세요.
      시간은 대만 시각이며 한국보다 1시간 늦습니다.
    </p>
  </div>

  <nav class="dock" aria-label="날짜 선택">
    <div class="dock-row" role="tablist">
      <button
        v-for="t in tabs"
        :id="'tab-' + t.id"
        :key="t.id"
        class="tab"
        role="tab"
        type="button"
        :aria-selected="active === t.id"
        aria-controls="view"
        @click="active = t.id"
      >
        <b>{{ t.label }}</b>
        <span>{{ t.short }}</span>
        <i v-if="t.isToday" class="today-dot" aria-label="오늘"></i>
      </button>
    </div>
  </nav>

  <PackSheet v-if="packOpen" @close="packOpen = false" />
  <BaggageSheet v-if="baggageOpen" @close="baggageOpen = false" />
  <MenuSheet v-if="menu" :menu="menu" @close="menu = null" />
  <TaxiCard v-if="taxi" :place="taxi" @close="taxi = null" />
</template>
