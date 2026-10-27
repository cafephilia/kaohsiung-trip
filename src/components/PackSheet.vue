<script setup lang="ts">
import { inject, onBeforeUnmount, onMounted, ref } from 'vue'
import { BAGGAGE_SUMMARY, PACKING } from '../data/trip'
import { packDone, packed, packTotal } from '../packing'
import { openBaggageKey } from '../utils'

const emit = defineEmits<{ close: [] }>()
const closeBtn = ref<HTMLButtonElement>()

const openBaggage = inject(openBaggageKey, () => {})
const groupDone =(ids: string[]) => ids.filter(id => packed[id]).length

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
    <div class="sheet" role="dialog" aria-modal="true" aria-labelledby="pack-title">
      <header class="sheet-head">
        <div class="sheet-titles">
          <div class="sheet-eyebrow pack-eyebrow">출발 전에</div>
          <h2 id="pack-title">챙길 것 <span class="prog">{{ packDone }}/{{ packTotal }}</span></h2>
          <div class="pack-bar" aria-hidden="true"><i :style="{ width: (packDone / packTotal) * 100 + '%' }"></i></div>
        </div>
        <button ref="closeBtn" class="sheet-close" type="button" aria-label="닫기" @click="emit('close')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </header>

      <div class="sheet-body">
        <div class="sheet-tips pack-lead">
          <p>{{ BAGGAGE_SUMMARY[0] }} 보조배터리와 귀중품은 기내 가방에 넣으세요.</p>
          <button class="btn" type="button" @click="openBaggage()">수하물 규정 자세히</button>
        </div>
        <section v-for="g in PACKING" :key="g.title" class="menu-sec">
          <h3>{{ g.title }} <span class="pack-count">{{ groupDone(g.items.map(c => c.id)) }}/{{ g.items.length }}</span></h3>
          <ul class="check">
            <li v-for="c in g.items" :key="c.id">
              <label :for="'p-' + c.id">
                <input :id="'p-' + c.id" v-model="packed[c.id]" type="checkbox">
                <span>{{ c.title }}<small>{{ c.detail }}</small></span>
              </label>
            </li>
          </ul>
        </section>
        <footer class="sheet-foot">
          <p>체크 표시는 이 휴대폰에만 저장돼요. 일행과 따로 챙긴다면 각자 휴대폰에서 체크하세요.</p>
        </footer>
      </div>
    </div>
  </div>
</template>
