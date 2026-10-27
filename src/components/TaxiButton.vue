<script setup lang="ts">
import { inject } from 'vue'
import type { Place } from '../types'
import { openTaxiKey } from '../utils'

defineProps<{ place: Place }>()
const openTaxi = inject(openTaxiKey, () => {})
</script>

<template>
  <button class="btn" type="button" @click="openTaxi(place)">
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
      <path d="M2.5 10.5V8l1.6-3.6A1.5 1.5 0 0 1 5.5 3.5h5a1.5 1.5 0 0 1 1.4.9L13.5 8v2.5" />
      <rect x="1.5" y="8" width="13" height="4" rx="1" />
      <circle cx="4.5" cy="12.5" r="1" />
      <circle cx="11.5" cy="12.5" r="1" />
    </svg>
    택시용 주소
  </button>
</template>
