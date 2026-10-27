import { computed, reactive, watch } from 'vue'
import { PACKING } from './data/trip'
import { checkKey, store } from './utils'

const ALL = PACKING.flatMap(g => g.items)

/** 짐 목록 체크 상태. 상단 버튼과 모달이 함께 쓴다 */
export const packed = reactive<Record<string, boolean>>(
  Object.fromEntries(ALL.map(c => [c.id, store.get(checkKey(c.id)) === '1'])),
)
watch(packed, v => {
  for (const [id, on] of Object.entries(v)) store.set(checkKey(id), on ? '1' : '0')
})

export const packTotal = ALL.length
export const packDone = computed(() => ALL.filter(c => packed[c.id]).length)
