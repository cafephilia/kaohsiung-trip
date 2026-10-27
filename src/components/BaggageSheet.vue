<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { BAGGAGE, BAGGAGE_SUMMARY } from '../data/trip'

const emit = defineEmits<{ close: [] }>()
const closeBtn = ref<HTMLButtonElement>()

// 모달이 열려 있는 동안 뒤쪽 페이지가 같이 스크롤되지 않게 막는다
let prevOverflow = ''
onMounted(() => {
  prevOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  closeBtn.value?.focus()
})
onBeforeUnmount(() => {
  document.body.style.overflow = prevOverflow
})
</script>

<template>
  <div class="sheet-backdrop" @click.self="emit('close')">
    <div class="sheet" role="dialog" aria-modal="true" aria-labelledby="bag-title">
      <header class="sheet-head">
        <div class="sheet-titles">
          <div class="sheet-eyebrow bag-eyebrow">보안검색 전에</div>
          <h2 id="bag-title">수하물 규정</h2>
          <div class="zh sub">제주항공 · 트리니티항공 · 김포 ↔ 가오슝 국제선</div>
        </div>
        <button ref="closeBtn" class="sheet-close" type="button" aria-label="닫기" @click="emit('close')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </header>

      <div class="sheet-body">
        <ul class="sheet-tips bag-summary">
          <li v-for="s in BAGGAGE_SUMMARY" :key="s">{{ s }}</li>
        </ul>
        <section v-for="g in BAGGAGE" :key="g.title" class="menu-sec">
          <h3>{{ g.title }}</h3>
          <ul class="tips bag-rules">
            <li v-for="[head, body] in g.items" :key="head">
              <b>{{ head }}</b>
              <span>{{ body }}</span>
            </li>
          </ul>
        </section>
        <footer class="sheet-foot">
          <p>2026년 10월 기준이에요. 애매한 물건은 한국공항공사 카카오톡 챗봇 「물어보안」이나 각 항공사 앱에서 확인하세요.</p>
        </footer>
      </div>
    </div>
  </div>
</template>
