<script setup lang="ts">
import { CVS_ITEMS, DRINK_TIPS, DRINKS, SHOP_PLACES, SHOP_TIPS, SOUVENIRS } from '../data/shopping'
import MapLink from './MapLink.vue'
import ShopGrid from './ShopGrid.vue'
</script>

<template>
  <section class="dayhead">
    <div class="overline"><span class="day-no">쇼핑</span><span>기념품 · 편의점 · 대만 술</span></div>
    <h2>사 갈 것과 편의점에서 즐길 것</h2>
    <p class="note food-lead">마지막 쇼핑은 3일차 투어 뒤 저녁이나 4일차 체크아웃 전이에요. 돌아가는 비행기는 위탁 15kg이라 무거운 건 골라서 사요.</p>
  </section>

  <div class="sec">
    <h3>기념품 <span class="prog">{{ SOUVENIRS.length }}</span></h3>
    <ShopGrid :items="SOUVENIRS" must-label="꼭 사기" label="기념품 종류" />
  </div>

  <div class="sec">
    <h3>어디서 살까</h3>
    <ul class="nm-list">
      <li v-for="p in SHOP_PLACES" :key="p.id">
        <details class="card nm-card">
          <summary class="head">
            <div class="meta">
              <span class="kind">{{ p.fromHotel }}</span>
              <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
            <div class="title">{{ p.name }}</div>
            <div class="zh sub">{{ p.zh }}</div>
            <div class="note">{{ p.kind }}</div>
          </summary>
          <div class="body">
            <dl class="facts">
              <dt>영업</dt><dd>{{ p.hours }}</dd>
              <dt>휴무</dt><dd>{{ p.closed }}</dd>
              <dt>가는 길</dt><dd>{{ p.access }}</dd>
            </dl>
            <ul class="nm-tips">
              <li v-for="t in p.tips" :key="t">{{ t }}</li>
            </ul>
            <div class="actions">
              <MapLink :query="p.map" solid />
            </div>
          </div>
        </details>
      </li>
    </ul>
  </div>

  <div class="sec">
    <h3>쇼핑 팁</h3>
    <div class="box">
      <ul>
        <li v-for="t in SHOP_TIPS" :key="t">{{ t }}</li>
      </ul>
    </div>
  </div>

  <div class="sec">
    <h3>편의점 꿀템 <span class="prog">{{ CVS_ITEMS.length }}</span></h3>
    <ShopGrid :items="CVS_ITEMS" must-label="꼭 먹기" label="편의점 종류" />
  </div>

  <div class="sec">
    <h3>대만 맥주 · 술 <span class="prog">{{ DRINKS.length }}</span></h3>
    <ShopGrid :items="DRINKS" must-label="추천" label="술 종류" />
  </div>

  <div class="sec">
    <h3>술 살 때 알아 둘 것</h3>
    <div class="box">
      <ul>
        <li v-for="t in DRINK_TIPS" :key="t">{{ t }}</li>
      </ul>
    </div>
  </div>
</template>
