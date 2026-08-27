// src/stores/filterStore.js
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

//상세 검색 필터링 조건 저장
export const useFilterStore = defineStore('filter', () => {
  // 입력 중인 체감 온도도 내부적으로 섭씨로 저장
  const minFeelsLikeCelsius = ref('')
  const minHumidity = ref('')

  // 실제 적용된 조건
  const appliedFeelsLikeCelsius = ref('')
  const appliedHumidity = ref('')

  const isFilterActive = computed(() => {
    return appliedFeelsLikeCelsius.value !== '' || appliedHumidity.value !== ''
  })

  function applyFilter() {
    appliedFeelsLikeCelsius.value = minFeelsLikeCelsius.value

    appliedHumidity.value = minHumidity.value
  }

  function resetFilter() {
    minFeelsLikeCelsius.value = ''
    minHumidity.value = ''
    appliedFeelsLikeCelsius.value = ''
    appliedHumidity.value = ''
  }

  return {
    minFeelsLikeCelsius,
    minHumidity,
    appliedFeelsLikeCelsius,
    appliedHumidity,
    isFilterActive,
    applyFilter,
    resetFilter,
  }
})
