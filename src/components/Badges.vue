<script setup lang="ts">
import type { Badge } from '../types'

defineProps<{ badges?: Badge[] }>()

const CLASS: Record<Badge, string> = {
  '예약 필수': 'must',
  '예약 추천': 'rec',
  '예약 불가': 'no',
  '줄 김': 'queue',
}
</script>

<template>
  <span v-for="b in badges" :key="b" class="badge" :class="CLASS[b]">{{ b }}</span>
</template>
