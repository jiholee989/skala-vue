<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/configStore'
import { useFilterStore } from '@/stores/filterStore'
import { fetchWeatherDetail } from '@/api/weatherApi'
import { toDisplayTemperature } from '@/utils/temperature'

const route = useRoute()
const router = useRouter()
const configStore = useConfigStore()
const filterStore = useFilterStore()

const cityData = ref(null)
const isLoading = ref(false)
const errorMessage = ref('')

async function loadWeatherDetail() {
  isLoading.value = true
  errorMessage.value = ''

  try {
    cityData.value = await fetchWeatherDetail(String(route.params.cityId))

    if (!cityData.value) {
      errorMessage.value = '등록되지 않은 도시입니다.'
    }
  } catch (error) {
    console.error('상세 날씨 요청 실패:', error)

    errorMessage.value = '상세 날씨 정보를 불러오지 못했습니다.'
  } finally {
    isLoading.value = false
  }
}

onMounted(loadWeatherDetail)

const displayTemp = computed(() => {
  if (!cityData.value) return ''
  return toDisplayTemperature(cityData.value.temp, configStore.unit)
})

const displayAppliedFeelsLike = computed(() => {
  const celsius = filterStore.appliedFeelsLikeCelsius

  if (celsius === '') return ''
  return toDisplayTemperature(celsius, configStore.unit)
})
</script>

<template>
  <section class="weather-detail">
    <h2>지역별 상세 기상 관측 정보</h2>

    <p v-if="isLoading" class="view-message">상세 날씨 정보를 불러오는 중입니다...</p>

    <p v-else-if="errorMessage" class="view-message error-message">
      {{ errorMessage }}
    </p>

    <div v-else class="detail-layout">
      <div class="city-detail">
        <div v-if="cityData">
          <h3>📍 {{ cityData.name }}</h3>
          <p>기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>
          <p>날씨: {{ cityData.status }}</p>
          <p>습도: {{ cityData.humidity }}%</p>
          <p>풍속: {{ cityData.wind }}m/s</p>
          <div class="air-quality">
            <h4>☁️ 대기질 정보</h4>
            <p>대기질: {{ cityData.airQuality }}</p>
            <p>미세먼지: {{ cityData.pm10 }}㎍/㎥</p>
            <p>초미세먼지: {{ cityData.pm25 }}㎍/㎥</p>
          </div>
        </div>

        <p v-else>도시 정보를 찾을 수 없습니다.</p>
      </div>

      <aside class="filter-summary">
        <h3>🔎 적용된 검색 조건</h3>

        <template v-if="filterStore.isFilterActive">
          <p v-if="filterStore.appliedFeelsLikeCelsius !== ''">
            체감온도
            {{ displayAppliedFeelsLike }}{{ configStore.unitSymbol }} 이상
          </p>

          <p v-if="filterStore.appliedHumidity !== ''">
            습도 {{ filterStore.appliedHumidity }}% 이상
          </p>
        </template>

        <p v-else>적용된 조건이 없습니다.</p>
      </aside>
    </div>

    <button class="back-button" type="button" @click="router.push('/')">
      <span aria-hidden="true">←</span>
      메인 대시보드로 돌아가기
    </button>
  </section>
</template>

<style scoped>
.weather-detail {
  padding: 20px;
  border: 1px solid #dcdfe6;
  border-radius: 10px;
  background: #ffffff;
}

.weather-detail > h2 {
  margin-bottom: 20px;
}

.view-message {
  margin: 20px 12px;
  padding: 16px;
  border: 1px solid #dfe7ec;
  border-radius: 8px;
  background: #f8fbfd;
  color: #526875;
}

.error-message {
  border-color: #e7c9c9;
  background: #fdf6f6;
  color: #9b4b4b;
}

.detail-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 210px;
  gap: 24px;
  align-items: start;
}

.city-detail {
  min-height: 190px;
  margin-left: 12px;
  padding: 18px 22px;
  border: 1px solid #dfe7ec;
  border-radius: 10px;
  background: #f8fbfd;
}

.city-detail h3 {
  margin: 0 0 12px;
  color: #284f69;
  font-size: 1.1rem;
}

.city-detail p {
  margin: 7px 0;
}

.air-quality {
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid #dfe7ec;
}

.air-quality h4 {
  margin: 0 0 8px;
  color: #3f6658;
  font-size: 0.95rem;
}

.filter-summary {
  padding: 12px 14px;
  border: 1px solid #e1e6ea;
  border-radius: 8px;
  background: #fafbfc;
  color: #66747c;
  font-size: 0.82rem;
}

.filter-summary h3 {
  margin: 0 0 8px;
  color: #465861;
  font-size: 0.9rem;
}

.filter-summary p {
  margin: 4px 0;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-top: 16px;
  margin-left: 12px;
  padding: 10px 15px;
  border: 1px solid #88b9d7;
  border-radius: 8px;
  background: #f1f7fa;
  color: #315f7d;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.2s,
    border-color 0.2s,
    box-shadow 0.2s,
    transform 0.1s;
}

.back-button:hover {
  border-color: #5d9fc8;
  background: #e3f0f7;
}

.back-button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(104, 169, 210, 0.25);
}

.back-button:active {
  transform: translateY(1px);
}

@media (max-width: 640px) {
  .detail-layout {
    grid-template-columns: 1fr;
  }

  .filter-summary {
    width: 100%;
  }

  .city-detail {
    margin-left: 0;
  }

  .back-button {
    margin-left: 0;
  }
}
</style>
