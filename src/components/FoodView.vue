<script setup lang="ts">
import { computed, ref } from 'vue'
import { FOOD_SPOTS } from '../data/foodspots'
import { SPOT_PHOTOS } from '../data/photos'
import type { FoodSpot } from '../types'
import Price from './Price.vue'
import Badges from './Badges.vue'
import MapLink from './MapLink.vue'
import MenuButton from './MenuButton.vue'

const ALL = '전체'
// 술집뿐 아니라 '한잔하기 좋음' 뱃지가 붙은 식당까지 모아 보는 필터
const DRINK = '🍺 한잔'
const genre = ref(ALL)
const area = ref(ALL)

const uniq = (xs: string[]) => [ALL, ...new Set(xs)]
const genres = computed(() => [ALL, DRINK, ...uniq(FOOD_SPOTS.map(s => s.genre)).slice(1)])
const areas = computed(() => uniq(FOOD_SPOTS.map(s => s.area)))

const matchGenre = (s: FoodSpot) =>
  genre.value === ALL
  || (genre.value === DRINK ? s.genre === '술집·바' || !!s.badges?.includes('한잔하기 좋음') : s.genre === genre.value)

const spots = computed(() =>
  FOOD_SPOTS.filter(s => matchGenre(s) && (area.value === ALL || s.area === area.value)),
)
</script>

<template>
  <section class="dayhead">
    <div class="overline"><span class="day-no">맛집</span><span>해산물 중심</span></div>
    <h2>가오슝 맛집</h2>
    <p class="note food-lead">해산물집을 먼저 모으고, 우육면·오리고기 덮밥·빙수 같은 가오슝 대표 음식을 더했어요. 외국인도 편하게 한잔할 수 있는 술집은 🍺 한잔 필터에 모았어요. 일정에 없는 곳도 있으니 시간이 남거나 계획이 바뀔 때 골라 가세요.</p>
  </section>

  <div class="filters" role="group" aria-label="종류">
    <button v-for="g in genres" :key="g" type="button" class="fchip" :aria-pressed="genre === g" @click="genre = g">{{ g }}</button>
  </div>
  <div class="filters" role="group" aria-label="지역">
    <button v-for="a in areas" :key="a" type="button" class="fchip area" :aria-pressed="area === a" @click="area = a">{{ a }}</button>
  </div>

  <p v-if="!FOOD_SPOTS.length" class="note">맛집 목록을 준비하고 있어요.</p>
  <p v-else-if="!spots.length" class="note">조건에 맞는 곳이 없어요. 필터를 바꿔 보세요.</p>

  <ul class="spots">
    <li v-for="s in spots" :key="s.id">
      <details class="card spot">
        <summary class="head">
          <figure v-if="SPOT_PHOTOS[s.id]" class="photo">
            <img :src="SPOT_PHOTOS[s.id].src" :alt="s.name" loading="lazy" decoding="async">
            <figcaption>
              <template v-if="SPOT_PHOTOS[s.id].example">예시 사진 · </template>{{ SPOT_PHOTOS[s.id].author }} · {{ SPOT_PHOTOS[s.id].license }}
            </figcaption>
          </figure>
          <div class="meta">
            <span class="kind">{{ s.genre }}</span>
            <span class="dur">{{ s.area }}</span>
            <span v-if="s.michelin" class="mich-pill">미쉐린</span>
            <span v-if="s.youtuber" class="yt-pill">한국인 추천</span>
            <Badges :badges="s.badges" />
            <span v-if="s.inItinerary" class="opt-pill">일정에 있음</span>
            <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
          <div class="title">{{ s.name }}</div>
          <div class="zh sub">{{ s.zh }}</div>
          <div class="note">{{ s.why }}</div>
          <div class="spot-price">1인 {{ s.price }}<template v-if="s.fromHotel"> · 호텔에서 {{ s.fromHotel }}</template></div>
        </summary>
        <div class="body">
          <ul class="menu">
            <li v-for="[ko, zh, twd] in s.orders" :key="ko">
              <span>{{ ko }} <span class="zh sub">{{ zh }}</span></span>
              <Price class="twd" :twd="twd" />
            </li>
          </ul>
          <dl class="facts">
            <dt>영업</dt><dd>{{ s.hours }}</dd>
            <dt>휴무</dt><dd>{{ s.closed }}</dd>
            <dt>가는 길</dt><dd>{{ s.access }}</dd>
          </dl>
          <div class="tip">{{ s.tips }}</div>
          <div class="actions">
            <MenuButton :id="s.id" />
            <MapLink :query="s.map" solid />
          </div>
          <p v-if="SPOT_PHOTOS[s.id]" class="credit">
            사진: <a :href="SPOT_PHOTOS[s.id].source" target="_blank" rel="noopener">{{ SPOT_PHOTOS[s.id].author }}</a>,
            <a :href="SPOT_PHOTOS[s.id].licenseUrl" target="_blank" rel="noopener">{{ SPOT_PHOTOS[s.id].license }}</a>,
            위키미디어 커먼즈 (크기 조정)
            <template v-if="SPOT_PHOTOS[s.id].example"><br>{{ SPOT_PHOTOS[s.id].example }}.</template>
          </p>
          <p class="credit">
            출처:
            <template v-for="(src, i) in s.sources" :key="src">
              <a :href="src" target="_blank" rel="noopener">{{ i + 1 }}</a><span v-if="i < s.sources.length - 1">, </span>
            </template>
          </p>
        </div>
      </details>
    </li>
  </ul>
</template>
