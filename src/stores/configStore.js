import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
  // state -- 여러 화면에서 공유할 온도 단위를 상태로 보관합니다.
  const unit = ref('celsius')

  // getter -- 현재 상태에 맞는 단위 기호 C/F
  const unitSymbol = computed(() => (unit.value === 'celsius' ? '℃' : '℉'))

  // actions -- F/C 토글
  function toggleUnit() {
    unit.value = unit.value === 'celsius' ? 'fahrenheit' : 'celsius'
  }

  return { unit, unitSymbol, toggleUnit }
})
