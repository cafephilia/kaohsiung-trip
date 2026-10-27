<script setup lang="ts">
import { computed, inject } from 'vue'
import { MENUS } from '../data/menus'
import { openMenuKey } from '../utils'

const props = defineProps<{ id: string; label?: string }>()
const openMenu = inject(openMenuKey, () => {})
const board = computed(() => MENUS[props.id])
</script>

<template>
  <button v-if="board" class="btn" type="button" @click="openMenu(board)">
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
      <rect x="3" y="1.5" width="10" height="13" rx="1.5" />
      <path d="M5.5 5h5M5.5 8h5M5.5 11h3" />
    </svg>
    {{ label ?? '메뉴판' }}
  </button>
</template>
