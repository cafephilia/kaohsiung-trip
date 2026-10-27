<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Place } from '../types'

defineProps<{ place: Place }>()
const emit = defineEmits<{ close: [] }>()
const closeBtn = ref<HTMLButtonElement>()

onMounted(() => closeBtn.value?.focus())
</script>

<template>
  <div class="taxi" role="dialog" aria-modal="true" aria-labelledby="taxi-name">
    <div class="lead">택시 기사님께 이 화면을 보여주세요</div>
    <div class="please">請載我到這裡，謝謝</div>
    <div id="taxi-name" class="name">{{ place.zh }}</div>
    <div class="addr">{{ place.addr }}</div>
    <div v-if="place.tel" class="tel">TEL {{ place.tel }}</div>
    <button ref="closeBtn" class="btn solid" type="button" @click="emit('close')">닫기</button>
  </div>
</template>
