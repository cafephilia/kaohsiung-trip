<script setup lang="ts">
import { OPTIONS } from '../data/trip'
import TimelineItem from './TimelineItem.vue'

// 일정에서 뺀 구경거리. 시간 자리에 언제 가면 좋은지를 적어 일정 카드와 같은 모양으로 보여준다
</script>

<template>
  <section class="dayhead">
    <div class="overline"><span class="day-no">갈만한 곳</span><span>할 게 없을 때</span></div>
    <h2>시간 남으면 가 볼 곳</h2>
    <p class="note food-lead">이번 여행은 맛있는 거 먹으면서 어슬렁거리는 게 중심이라 일정에서 뺀 곳들이에요. 카드 위의 때를 보고, 내키면 골라 가요.</p>
  </section>
  <ol class="tl">
    <TimelineItem v-for="item in OPTIONS" :key="item.title" :item="item" />
  </ol>
</template>
