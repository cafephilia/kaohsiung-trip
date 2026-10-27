<script setup lang="ts">
import type { TipGroup } from '../types'

defineProps<{ groups: TipGroup[] }>()
</script>

<template>
  <details v-for="g in groups" :key="g.title" class="box tip-group">
    <summary>
      <span class="tg-title">{{ g.title }}</span>
      <span class="tg-count">{{ g.items.length }}</span>
      <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </summary>
    <ul class="tips">
      <li v-for="[head, body] in g.items" :key="head">
        <b>{{ head }}</b>
        <span>{{ body }}</span>
      </li>
    </ul>
  </details>
</template>
