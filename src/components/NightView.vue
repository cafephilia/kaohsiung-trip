<script setup lang="ts">
import { computed, ref } from 'vue'
import { NIGHT_FOODS, NIGHT_MARKETS, NIGHT_PHRASES, NIGHT_TIPS, TRIP_NIGHTS } from '../data/night'
import { formatTwd } from '../utils'
import MapLink from './MapLink.vue'

const ALL = '전체'
const MUST = '꼭 먹기'
const cat = ref(MUST)
const cats = [MUST, ALL, ...new Set(NIGHT_FOODS.map(f => f.cat))]

const foods = computed(() =>
  NIGHT_FOODS.filter(f => cat.value === ALL || (cat.value === MUST ? f.must : f.cat === cat.value)),
)
</script>

<template>
  <section class="dayhead">
    <div class="overline"><span class="day-no">야시장</span><span>특별 코너</span></div>
    <h2>야시장에서 꼭 먹어 볼 음식</h2>
    <p class="note food-lead">숙소 바로 옆 류허 야시장과 현지인이 많이 가는 루이펑 야시장을 중심으로 골랐어요. 여러 가지를 조금씩 나눠 먹는 게 야시장을 즐기는 방법이에요.</p>
  </section>

  <div class="sec">
    <h3>야시장 고르기</h3>
    <ul class="nm-list">
      <li v-for="m in NIGHT_MARKETS" :key="m.id">
        <details class="card nm-card">
          <summary class="head">
            <div class="meta">
              <span class="kind">{{ m.fromHotel }}</span>
              <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
            <div class="title">{{ m.name }}</div>
            <div class="zh sub">{{ m.zh }}</div>
            <div class="note">{{ m.vibe }}</div>
            <div class="nm-nights" aria-label="이번 여행에서 여는 밤">
              <span v-for="n in TRIP_NIGHTS" :key="n" class="nm-night" :class="{ off: !m.openNights.includes(n) }">{{ n }}</span>
            </div>
          </summary>
          <div class="body">
            <dl class="facts">
              <dt>영업</dt><dd>{{ m.hours }}</dd>
              <dt>가는 길</dt><dd>{{ m.access }}</dd>
            </dl>
            <ul class="nm-tips">
              <li v-for="t in m.tips" :key="t">{{ t }}</li>
            </ul>
            <div class="actions">
              <MapLink :query="m.map" solid />
            </div>
          </div>
        </details>
      </li>
    </ul>
  </div>

  <div class="sec">
    <h3>먹어 볼 음식 <span class="prog">{{ foods.length }}</span></h3>
    <div class="filters" role="group" aria-label="종류">
      <button v-for="c in cats" :key="c" type="button" class="fchip" :aria-pressed="cat === c" @click="cat = c">{{ c }}</button>
    </div>
    <ul class="nf-grid">
      <li v-for="f in foods" :key="f.zh" class="nf" :class="{ must: f.must }">
        <div class="nf-tags">
          <span v-if="f.must" class="nf-must">꼭 먹기</span>
          <span class="nf-cat">{{ f.cat }}</span>
        </div>
        <div class="nf-head">
          <span class="nf-name">{{ f.name }}</span>
          <span class="nf-price">{{ formatTwd(f.price) }}</span>
        </div>
        <div class="nf-zh zh">{{ f.zh }}</div>
        <p class="nf-desc">{{ f.desc }}</p>
        <div class="nf-where">📍 {{ f.where }}</div>
        <div v-if="f.warn" class="nf-warn">⚠️ {{ f.warn }}</div>
      </li>
    </ul>
  </div>

  <div class="sec">
    <h3>주문할 때 쓰는 말</h3>
    <div class="box">
      <table class="phrases">
        <tbody>
          <tr v-for="[ko, zh, sound] in NIGHT_PHRASES" :key="zh">
            <td>{{ ko }}</td>
            <td><div class="ph-zh">{{ zh }}</div><div class="ph-sound">{{ sound }}</div></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="sec">
    <h3>야시장 팁</h3>
    <div class="box">
      <ul>
        <li v-for="t in NIGHT_TIPS" :key="t">{{ t }}</li>
      </ul>
    </div>
  </div>
</template>
