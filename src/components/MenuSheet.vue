<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { MenuBoard } from '../types'
import Price from './Price.vue'

defineProps<{ menu: MenuBoard }>()
const emit = defineEmits<{ close: [] }>()
const closeBtn = ref<HTMLButtonElement>()

// 메뉴판이 열려 있는 동안 뒤쪽 페이지가 같이 스크롤되지 않게 막는다
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
    <div class="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
      <header class="sheet-head">
        <div class="sheet-titles">
          <div class="sheet-eyebrow">메뉴판</div>
          <h2 id="sheet-title">{{ menu.title }}</h2>
          <div class="zh sub">{{ menu.zh }}</div>
        </div>
        <button ref="closeBtn" class="sheet-close" type="button" aria-label="닫기" @click="emit('close')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </header>

      <div class="sheet-body">
        <ul v-if="menu.tips?.length" class="sheet-tips">
          <li v-for="tip in menu.tips" :key="tip">{{ tip }}</li>
        </ul>

        <section v-for="sec in menu.sections" :key="sec.name" class="menu-sec">
          <h3>{{ sec.name }}</h3>
          <ul class="menu-items">
            <li v-for="it in sec.items" :key="it.ko + it.zh">
              <div class="mi-row">
                <span class="mi-name">
                  {{ it.ko }}
                  <span v-if="it.tag" class="mi-tag" :class="{ hot: it.tag === '매움' }">{{ it.tag }}</span>
                </span>
                <Price class="mi-twd" :twd="it.twd" />
              </div>
              <div class="zh mi-zh">{{ it.zh }}</div>
              <p v-if="it.desc" class="mi-desc">{{ it.desc }}</p>
            </li>
          </ul>
        </section>

        <footer class="sheet-foot">
          <p v-if="menu.note">{{ menu.note }}</p>
          <p>가격과 메뉴는 바뀔 수 있어요. 가게 메뉴판을 기준으로 주문하세요.</p>
          <p v-if="menu.sources?.length">
            출처:
            <template v-for="(src, i) in menu.sources" :key="src">
              <a :href="src" target="_blank" rel="noopener">{{ i + 1 }}</a><span v-if="i < menu.sources.length - 1">, </span>
            </template>
          </p>
        </footer>
      </div>
    </div>
  </div>
</template>
