<script setup lang="ts">
import { computed } from 'vue'
import { formatTwd, twdKrw } from '../utils'

// 대만달러 가격과 그 아래 원화 어림값. '시가'·'미확인'처럼 숫자로 시작하지 않으면 글 그대로 보여준다
const props = defineProps<{ twd: string }>()
const krw = computed(() => twdKrw(props.twd))
</script>

<template>
  <span class="price">
    <span>{{ krw ? formatTwd(twd) : twd }}</span>
    <span v-if="krw" class="krw">{{ krw }}</span>
  </span>
</template>
