<script setup lang="ts">
import { computed, ref } from 'vue'
import { WHISKIES } from '../data/shopping'
import Price from './Price.vue'

// 카발란 위스키 카드. 대만에서 사는 값과 한국에서 사는 값을 나란히 보여준다
const MUST = '추천'
const ALL = '전체'
const filter = ref(MUST)
const shown = computed(() => (filter.value === MUST ? WHISKIES.filter(w => w.must) : WHISKIES))
</script>

<template>
  <div class="filters" role="group" aria-label="위스키">
    <button v-for="c in [MUST, ALL]" :key="c" type="button" class="fchip" :aria-pressed="filter === c" @click="filter = c">{{ c }}</button>
  </div>
  <ul class="nf-grid">
    <li v-for="w in shown" :key="w.en" class="nf" :class="{ must: w.must }">
      <div class="nf-tags">
        <span v-if="w.must" class="nf-must">추천</span>
        <span class="nf-cat">{{ w.suits }}</span>
      </div>
      <div class="nf-name">{{ w.name }}</div>
      <div class="nf-zh zh">{{ w.zh }} · {{ w.en }}</div>
      <div class="nf-where">{{ w.abv }} · {{ w.size }}</div>
      <p class="nf-desc">{{ w.desc }}</p>
      <dl class="wk-compare">
        <dt>대만</dt>
        <dd><Price class="wk-price" :twd="w.twd" /><span class="wk-where">{{ w.twdWhere }}</span></dd>
        <dt>한국</dt>
        <dd><span class="wk-krw">{{ w.krw }}</span><span class="wk-where">{{ w.krwWhere }}</span></dd>
      </dl>
      <div v-if="w.saving" class="wk-saving">💰 {{ w.saving }}</div>
    </li>
  </ul>
</template>
