<script setup lang="ts">
import { computed, inject, reactive, watch } from 'vue'
import {
  CHECKLIST, CONTACTS, EMBASSY, EVENTS, FARES, FARE_NOTES, FIRST_TRIP_TIPS, FLIGHT_INCLUDES, FLIGHTS,
  HOTEL, HOTEL_FACTS, STAY, USEFUL_APPS, WALKS, WEATHER,
} from '../data/trip'
import { packDone, packTotal } from '../packing'
import { checkKey, openBaggageKey, openPackKey, store } from '../utils'
import MapLink from './MapLink.vue'
import TaxiButton from './TaxiButton.vue'
import TipGroups from './TipGroups.vue'

const checked = reactive<Record<string, boolean>>(
  Object.fromEntries(CHECKLIST.map(c => [c.id, store.get(checkKey(c.id)) === '1'])),
)
watch(checked, v => {
  for (const [id, on] of Object.entries(v)) store.set(checkKey(id), on ? '1' : '0')
})
const doneCount = computed(() => CHECKLIST.filter(c => checked[c.id]).length)
const openPack = inject(openPackKey, () => {})
const openBaggage = inject(openBaggageKey, () => {})
</script>

<template>
  <section class="dayhead">
    <div class="overline"><span class="day-no">정보</span><span>출발 전에 확인</span></div>
    <h2>여행 정보</h2>
    <ul class="route plain">
      <li>오프라인</li><li>항공권</li><li>숙소</li><li>준비물</li><li>여행 팁</li><li>앱</li><li>교통</li><li>연락처</li>
    </ul>
  </section>

  <div class="sec">
    <h3>인터넷 없이 보기</h3>
    <div class="box">
      <ul>
        <li>이 페이지를 인터넷이 될 때 한 번 열어 두면 일정, 사진, 메뉴판이 휴대폰에 저장돼요. 대만에서 데이터가 끊겨도 열 수 있어요.</li>
        <li>구글 지도 링크와 출처 링크는 인터넷이 있어야 열려요.</li>
        <li>홈 화면에 추가하면 앱처럼 열려요. 아이폰은 사파리 공유 버튼 → 홈 화면에 추가, 안드로이드는 크롬 메뉴(⋮) → 홈 화면에 추가.</li>
        <li>출발 전에 와이파이에서 한 번 열고, 각 날짜 탭과 맛집·야시장 탭을 한 번씩 눌러 두면 가장 확실해요.</li>
      </ul>
    </div>
  </div>

  <div class="sec">
    <h3>항공권 · 트립닷컴 항공+호텔</h3>
    <div v-for="f in FLIGHTS" :key="f.code" class="pass">
      <div class="main">
        <div class="legs">
          <div>
            <div class="city">{{ f.from.city }}</div>
            <div class="apt">{{ f.from.code }}</div>
            <div class="tm">{{ f.from.time }}</div>
          </div>
          <div class="mid">{{ f.duration }}<br>──✈</div>
          <div class="r">
            <div class="city">{{ f.to.city }}</div>
            <div class="apt">{{ f.to.code }}</div>
            <div class="tm">{{ f.to.time }}</div>
          </div>
        </div>
        <div class="meta"><span v-for="m in f.meta" :key="m">{{ m }}</span></div>
      </div>
      <div class="stub">
        <div class="d">{{ f.dir }}</div>
        <div class="code">{{ f.code }}</div>
        <div class="d">{{ f.date }}</div>
      </div>
    </div>
    <div class="box">
      <h4>예약 내용 (1인)</h4>
      <ul>
        <li v-for="x in FLIGHT_INCLUDES" :key="x">{{ x }}</li>
      </ul>
      <div class="actions top-gap">
        <button class="btn solid" type="button" @click="openBaggage()">보안검색 전 수하물 규정 보기</button>
      </div>
    </div>
  </div>

  <div class="sec">
    <h3>숙소</h3>
    <div class="box">
      <h4>{{ STAY.name }} <span class="zh sub-zh">{{ HOTEL.zh }}</span></h4>
      <dl class="facts spaced">
        <dt>주소</dt><dd class="zh">{{ HOTEL.addr }}</dd>
        <dt>전화</dt><dd class="mono">{{ HOTEL.tel }}</dd>
        <template v-for="[label, value] in HOTEL_FACTS" :key="label">
          <dt>{{ label }}</dt><dd>{{ value }}</dd>
        </template>
      </dl>
      <div class="actions">
        <MapLink :query="STAY.map" solid />
        <TaxiButton :place="HOTEL" />
      </div>
    </div>
  </div>

  <div class="sec">
    <h3>출발 전 할 일<span class="prog">{{ doneCount }}/{{ CHECKLIST.length }}</span></h3>
    <div class="box">
      <ul class="check">
        <li v-for="c in CHECKLIST" :key="c.id">
          <label :for="'c-' + c.id">
            <input :id="'c-' + c.id" v-model="checked[c.id]" type="checkbox">
            <span>{{ c.title }}<small>{{ c.detail }}</small></span>
          </label>
        </li>
      </ul>
    </div>
    <button class="btn pack-open" type="button" @click="openPack()">
      짐 챙길 것 목록 열기 <span class="prog">{{ packDone }}/{{ packTotal }}</span>
    </button>
  </div>

  <div class="sec">
    <h3>처음 대만 여행 팁</h3>
    <TipGroups :groups="FIRST_TRIP_TIPS" />
  </div>

  <div class="sec">
    <h3>유용한 앱</h3>
    <TipGroups :groups="USEFUL_APPS" />
  </div>

  <div class="sec">
    <h3>교통 요금</h3>
    <div class="box">
      <table class="tbl">
        <tbody>
          <tr v-for="[name, fare] in FARES" :key="name"><td>{{ name }}</td><td>{{ fare }}</td></tr>
        </tbody>
      </table>
    </div>
    <div class="box">
      <ul>
        <li v-for="n in FARE_NOTES" :key="n">{{ n }}</li>
      </ul>
    </div>
  </div>

  <div class="sec">
    <h3>숙소에서 걸어서</h3>
    <div class="box">
      <table class="tbl">
        <tbody>
          <tr v-for="[name, mins] in WALKS" :key="name"><td>{{ name }}</td><td>{{ mins }}</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="sec">
    <h3>여행 기간 가오슝 행사</h3>
    <div class="box">
      <table class="tbl">
        <tbody>
          <tr v-for="[name, when] in EVENTS" :key="name"><td>{{ name }}</td><td>{{ when }}</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="sec">
    <h3>날씨와 쇼핑</h3>
    <div class="box">
      <ul>
        <li v-for="w in WEATHER" :key="w">{{ w }}</li>
      </ul>
    </div>
  </div>

  <div class="sec">
    <h3>긴급 연락처</h3>
    <div class="box">
      <table class="tbl">
        <tbody>
          <tr v-for="[name, tel] in CONTACTS" :key="name"><td>{{ name }}</td><td>{{ tel }}</td></tr>
        </tbody>
      </table>
      <p class="note consulate">{{ EMBASSY.label }}: <span class="zh">{{ EMBASSY.addr }}</span></p>
      <div class="actions">
        <MapLink :query="EMBASSY.map" />
      </div>
    </div>
  </div>
</template>
