<script setup lang="ts">
import { WAY_LABEL, type Way, type WayMode } from '../types'

defineProps<{ ways: Way[] }>()

// lucide 아이콘(ISC 라이선스)을 기반으로 단순화한 경로
const ICON: Record<WayMode, string[]> = {
  walk: [
    'M13 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z',
    'M7 22l3-7 2.5 2.5V22', 'M10 15l1-6 3 3h3', 'M11 9 8 10.5 6.5 14',
  ],
  subway: [
    'M8 3h8a4 4 0 0 1 4 4v8a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a4 4 0 0 1 4-4z',
    'M4 11h16', 'M8 15h.01', 'M16 15h.01', 'M8 18l-2 3', 'M16 18l2 3',
  ],
  train: [
    'M8 3h8a4 4 0 0 1 4 4v8a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a4 4 0 0 1 4-4z',
    'M4 11h16', 'M12 3v8', 'M8 15h.01', 'M16 15h.01', 'M8 18l-2 3', 'M16 18l2 3',
  ],
  lrt: [
    'M7 6h10a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3z',
    'M9 2h6', 'M12 2v4', 'M4 12h16', 'M8 15h.01', 'M16 15h.01', 'M7 18l-2 3', 'M17 18l2 3',
  ],
  ferry: [
    'M2 21c1.5 0 2.5-1 4-1s2.5 1 4 1 2.5-1 4-1 2.5 1 4 1 2.5-1 4-1',
    'M4 18l-1-5h18l-1 5', 'M6 13V8h12v5', 'M12 8V4', 'M9 4h6',
  ],
  bus: [
    'M4 6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v11H4V6z', 'M4 11h16', 'M8 15h.01', 'M16 15h.01',
    'M6 17v3', 'M18 17v3',
  ],
  taxi: [
    'M5 17h14v-5l-2-5H7l-2 5v5z', 'M5 12h14', 'M10 4h4v3', 'M7.5 14.5h.01', 'M16.5 14.5h.01',
    'M6 17v2', 'M18 17v2',
  ],
}
</script>

<template>
  <div class="ways">
    <div class="ways-label">이동 방법</div>
    <ol class="way-list">
      <li v-for="(w, i) in ways" :key="i" class="way" :class="{ best: w.best }">
        <div class="way-head">
          <span class="way-icon" :class="'m-' + w.mode">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
              stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path v-for="d in ICON[w.mode]" :key="d" :d="d" />
            </svg>
          </span>
          <div class="way-title">
            <div class="way-mode">
              {{ WAY_LABEL[w.mode] }}
              <span v-if="w.best" class="way-best">추천</span>
            </div>
            <div class="way-label">{{ w.label }}</div>
            <div v-if="w.cost" class="way-cost">{{ w.cost }}</div>
          </div>
          <span class="way-time">{{ w.time }}</span>
        </div>
        <ol v-if="w.steps" class="way-steps">
          <li v-for="s in w.steps" :key="s">{{ s }}</li>
        </ol>
        <p v-if="w.note" class="way-note">{{ w.note }}</p>
      </li>
    </ol>
  </div>
</template>
