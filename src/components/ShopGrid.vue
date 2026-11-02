<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ShopItem } from '../types'
import Price from './Price.vue'

// 쇼핑 탭의 상품 카드 목록. 종류 칩으로 거르고, 처음에는 '꼭 사기'만 보여준다
const props = defineProps<{ items: ShopItem[]; mustLabel: string; label: string }>()

const ALL = '전체'
const cat = ref(props.mustLabel)
const cats = computed(() => [props.mustLabel, ALL, ...new Set(props.items.map(i => i.cat))])
const shown = computed(() =>
  props.items.filter(i => cat.value === ALL || (cat.value === props.mustLabel ? i.must : i.cat === cat.value)),
)
</script>

<template>
  <div class="filters" role="group" :aria-label="label">
    <button v-for="c in cats" :key="c" type="button" class="fchip" :aria-pressed="cat === c" @click="cat = c">{{ c }}</button>
  </div>
  <ul class="nf-grid">
    <li v-for="i in shown" :key="i.zh + i.name" class="nf" :class="{ must: i.must }">
      <div class="nf-tags">
        <span v-if="i.must" class="nf-must">{{ mustLabel }}</span>
        <span class="nf-cat">{{ i.cat }}</span>
      </div>
      <div class="nf-head">
        <span class="nf-name">{{ i.name }}</span>
        <Price class="nf-price" :twd="i.price" />
      </div>
      <div class="nf-zh zh">{{ i.zh }}</div>
      <div v-if="i.abv || i.size" class="nf-where">{{ [i.abv, i.size].filter(Boolean).join(' · ') }}</div>
      <p class="nf-desc">{{ i.desc }}</p>
      <div class="nf-where">📍 {{ i.where }}</div>
      <div v-if="i.warn" class="nf-warn">⚠️ {{ i.warn }}</div>
    </li>
  </ul>
</template>
