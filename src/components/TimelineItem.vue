<script setup lang="ts">
import { computed, inject } from 'vue'
import { KIND_LABEL, type Item } from '../types'
import { PACKING } from '../data/trip'
import { packDone, packed, packTotal } from '../packing'
import { formatTwd, openBaggageKey, openPackKey } from '../utils'
import KindIcon from './KindIcon.vue'
import MapLink from './MapLink.vue'
import MenuButton from './MenuButton.vue'
import Badges from './Badges.vue'
import TaxiButton from './TaxiButton.vue'
import WayList from './WayList.vue'

const props = defineProps<{ item: Item; state?: 'past' | 'now' }>()

const hasBody = computed(() => {
  const it = props.item
  return Boolean(it.ways || it.facts || it.menu || it.tip || it.map || it.alt || it.taxi || it.picks || it.menuId || it.baggage)
})

const openBaggage = inject(openBaggageKey, () => {})
const openPack = inject(openPackKey, () => {})

/** 아직 안 챙긴 것 앞의 두 개만 보여주고 나머지는 개수로 줄인다 */
const packLeft = computed(() => {
  const left = PACKING.flatMap(g => g.items).filter(c => !packed[c.id]).map(c => c.title)
  if (!left.length) return '다 챙겼어요.'
  const head = left.slice(0, 2).join(', ')
  return left.length > 2 ? `남은 것: ${head} 외 ${left.length - 2}개` : `남은 것: ${head}`
})
</script>

<template>
  <li class="item" :class="[`k-${item.k}`, state, { optional: item.optional }]">
    <div class="node"><KindIcon :kind="item.k" /></div>
    <component :is="hasBody ? 'details' : 'div'" class="card">
      <component :is="hasBody ? 'summary' : 'div'" class="head">
        <figure v-if="item.photo" class="photo">
          <img :src="item.photo.src" :alt="item.title" loading="lazy" decoding="async">
          <figcaption><template v-if="item.photo.example">예시 사진 · </template>{{ item.photo.author }} · {{ item.photo.license }}</figcaption>
        </figure>
        <div class="meta">
          <span class="time">{{ item.t }}</span>
          <span class="kind">{{ KIND_LABEL[item.k] }}</span>
          <Badges :badges="item.badges" />
          <span v-if="item.optional" class="opt-pill">선택</span>
          <span v-if="item.dur" class="dur">{{ item.dur }}</span>
          <span v-if="state === 'now'" class="now-pill">지금</span>
          <svg v-if="hasBody" class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
        <div class="title">{{ item.title }}</div>
        <div v-if="item.zh" class="zh sub">{{ item.zh }}</div>
        <div v-if="item.note" class="note">{{ item.note }}</div>
        <div v-if="item.packing" class="pack-card">
          <div class="pc-row">
            <div class="pack-bar" aria-hidden="true"><i :style="{ width: (packDone / packTotal) * 100 + '%' }"></i></div>
            <span class="prog">{{ packDone }}/{{ packTotal }}</span>
          </div>
          <p class="pc-left">{{ packLeft }}</p>
          <div class="actions">
            <button class="btn solid" type="button" @click="openPack()">목록 열기</button>
            <button class="btn" type="button" @click="openBaggage()">수하물 규정</button>
          </div>
        </div>
      </component>

      <div v-if="hasBody" class="body">
        <WayList v-if="item.ways" :ways="item.ways" />
        <dl v-if="item.facts" class="facts">
          <template v-for="[label, value] in item.facts" :key="label">
            <dt>{{ label }}</dt>
            <dd>{{ value }}</dd>
          </template>
        </dl>
        <ul v-if="item.menu" class="menu">
          <li v-for="[name, twd] in item.menu" :key="name">
            <span>{{ name }}</span>
            <span class="twd">{{ formatTwd(twd) }}</span>
          </li>
        </ul>
        <ol v-if="item.picks" class="picks">
          <li v-for="p in item.picks" :key="p.title" class="pick">
            <div class="pick-kind">{{ p.kind }} <Badges :badges="p.badges" /></div>
            <div class="alt-title">{{ p.title }}</div>
            <div class="zh sub">{{ p.zh }}</div>
            <div class="note">{{ p.note }}</div>
            <dl class="facts">
              <template v-for="[label, value] in p.facts" :key="label">
                <dt>{{ label }}</dt>
                <dd>{{ value }}</dd>
              </template>
            </dl>
            <div class="actions">
              <MenuButton v-if="p.menuId" :id="p.menuId" />
              <MapLink :query="p.map" />
            </div>
          </li>
        </ol>
        <div v-if="item.tip" class="tip" :class="{ warn: item.tipWarn }">
          <b v-if="item.tipWarn">중요</b>
          {{ item.tip }}
        </div>
        <div v-if="item.map || item.taxi || item.menuId || item.baggage" class="actions">
          <button v-if="item.baggage" class="btn" type="button" @click="openBaggage()">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="3" y="5" width="10" height="9" rx="1.8" /><path d="M6 5V3.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1V5" />
            </svg>
            수하물 규정
          </button>
          <MenuButton v-if="item.menuId" :id="item.menuId" />
          <MapLink v-if="item.map" :query="item.map" solid />
          <TaxiButton v-if="item.taxi" :place="item.taxi" />
        </div>
        <div v-if="item.alt" class="alt">
          <div class="alt-label">대안 <Badges :badges="item.alt.badges" /></div>
          <div class="alt-title">{{ item.alt.title }}</div>
          <div class="zh sub">{{ item.alt.zh }}</div>
          <div class="note">{{ item.alt.note }}</div>
          <div class="actions">
            <MenuButton v-if="item.alt.menuId" :id="item.alt.menuId" />
            <MapLink :query="item.alt.map" />
          </div>
        </div>
        <p v-if="item.photo" class="credit">
          사진: <a :href="item.photo.source" target="_blank" rel="noopener">{{ item.photo.author }}</a>,
          <a :href="item.photo.licenseUrl" target="_blank" rel="noopener">{{ item.photo.license }}</a>,
          위키미디어 커먼즈 (크기 조정)
          <template v-if="item.photo.example"><br>{{ item.photo.example }}.</template>
        </p>
      </div>
    </component>
  </li>
</template>
