<script setup lang="ts">
import { mapUrl } from '../utils'

defineProps<{ query: string; solid?: boolean }>()
</script>

<template>
  <a class="btn" :class="{ solid }" :href="mapUrl(query)" target="_blank" rel="noopener">
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
      <path d="M8 15s5-4.6 5-8.5A5 5 0 0 0 3 6.5C3 10.4 8 15 8 15Z" />
      <circle cx="8" cy="6.5" r="1.8" />
    </svg>
    구글 지도
  </a>
</template>
