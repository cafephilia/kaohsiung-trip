<script setup lang="ts">
import type { Kind } from '../types'

defineProps<{ kind: Kind }>()

// lucide 아이콘(ISC 라이선스)을 기반으로 단순화한 경로
const PATHS: Record<Kind, string[]> = {
  prep: [
    'M6 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z',
    'M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2', 'M9 14l2 2 4-4',
  ],
  flight: [
    'M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z',
  ],
  move: [
    'M8 3h8a4 4 0 0 1 4 4v8a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a4 4 0 0 1 4-4z',
    'M4 11h16', 'M8 15h.01', 'M16 15h.01', 'M8 18l-2 3', 'M16 18l2 3',
  ],
  sight: ['M3 21h18', 'M5 21V10', 'M19 21V10', 'M2 10l10-6 10 6', 'M10 21v-5h4v5'],
  shop: ['M6 7h12l1 14H5L6 7z', 'M9 10V7a3 3 0 0 1 6 0v3'],
  food: [
    'M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2', 'M7 2v20',
    'M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7',
  ],
  stay: ['M2 4v16', 'M2 8h18a2 2 0 0 1 2 2v10', 'M2 17h20', 'M6 8v9'],
}
</script>

<template>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path v-for="d in PATHS[kind]" :key="d" :d="d" />
  </svg>
</template>
