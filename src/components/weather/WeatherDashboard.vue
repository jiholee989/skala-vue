<script setup>
import BaseDashboardCard from '@/components/weather/BaseDashboardCard.vue'
import SearchBar from '@/components/weather/SearchBar.vue'
import SearchFilter from '@/components/weather/SearchFilter.vue'
import WeatherCard from '@/components/weather/WeatherCard.vue'

import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import { fetchWeatherList } from '@/api/weatherApi'

import { useRouter } from 'vue-router'
import { useFilterStore } from '@/stores/filterStore'
import { useConfigStore } from '@/stores/configStore'
import { toCelsius, toDisplayTemperature } from '@/utils/temperature'

const weatherList = ref([])
const isLoading = ref(false)
const errorMessage = ref('')

async function loadWeatherList() {
  isLoading.value = true
  errorMessage.value = ''

  try {
    weatherList.value = await fetchWeatherList()
  } catch (error) {
    console.error('날씨 목록 요청 실패:', error)

    errorMessage.value = '날씨 정보를 불러오지 못했습니다.'
  } finally {
    isLoading.value = false
  }
}

onMounted(loadWeatherList)

const router = useRouter()
const filterStore = useFilterStore()
const configStore = useConfigStore()

const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')

const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim()
  if (!query) return weatherList.value // 검색어가 없으면 전체 목록을 그대로 반환
  return weatherList.value.filter((item) => item.name.includes(query))
})

const finalWeatherList = computed(() => {
  let result = filteredWeatherList.value

  if (filterStore.appliedFeelsLikeCelsius !== '') {
    result = result.filter((item) => item.feelsLike >= Number(filterStore.appliedFeelsLikeCelsius))
  }

  if (filterStore.appliedHumidity !== '') {
    result = result.filter((item) => item.humidity >= Number(filterStore.appliedHumidity))
  }

  return result
})

//체감 온도 - 항상 섭씨로 저장
const displayMinFeelsLike = computed({
  get() {
    const celsius = filterStore.minFeelsLikeCelsius
    if (celsius === '') return ''
    return toDisplayTemperature(celsius, configStore.unit)
  },
  set(value) {
    if (value === '') {
      filterStore.minFeelsLikeCelsius = ''
      return
    }
    filterStore.minFeelsLikeCelsius = toCelsius(value, configStore.unit)
  },
})

watch(selectedCityInfo, (newInfo) => {
  // 선택 상태가 바뀔 때마다 콘솔에 기록
  console.log('[watch] 선택 상태:', newInfo)
})

watchEffect(() => {
  const query = searchQuery.value.trim()
  console.log('[watchEffect] 검색어:', query) // 내부에서 참조한 searchQuery를 자동으로 추적

  if (query) {
    selectedCityInfo.value = '검색 결과에서 도시를 선택하세요.' //검색중일 경우, 보이지 않는 카드에 대한 선택 뜨지 않도록
  } else {
    selectedCityInfo.value = '카드를 클릭하여 도시를 선택하세요.'
  }
})

watch(
  () => [filterStore.minFeelsLikeCelsius, filterStore.minHumidity],
  ([newTemp, newHumidity]) => {
    console.log('[watch] 최소 체감온도:', newTemp)
    console.log('[watch] 최소 습도:', newHumidity)
  },
)

function goDetail(cityId) {
  router.push(`/weather/${cityId}`)
}
</script>

<template>
  <div class="dashboard-wrapper">
    <!-- 검색 공통 박스 -->
    <BaseDashboardCard>
      <template #title>
        <h2>🔎 도시 검색 🗺️</h2>
        <!--BaseDashboardCard.vue의 title 부분-->
      </template>

      <!-- 검색 input은 SearchBar가 담당 -->
      <SearchBar :current-query="searchQuery" @update-query="(value) => (searchQuery = value)" />

      <p>
        검색 중인 도시: <strong>{{ searchQuery }}</strong>
      </p>

      <div class="search-divider" aria-hidden="true"></div>

      <h2>🔎 상세 검색 🗂️</h2>
      <SearchFilter
        :min-feels-like="displayMinFeelsLike"
        :min-humidity="filterStore.minHumidity"
        @update-feels-like="displayMinFeelsLike = $event"
        @update-humidity="filterStore.minHumidity = $event"
        @apply-filter="filterStore.applyFilter"
        @reset-filter="filterStore.resetFilter"
      />
    </BaseDashboardCard>

    <!-- 날씨 목록 박스 -->
    <BaseDashboardCard>
      <template #title>
        <h2>🏞️ 지역별 날씨 현황 🌤️</h2>
      </template>

      <!-- API 요청 중 -->
      <p v-if="isLoading">날씨 정보를 불러오는 중입니다...</p>
      <!-- API 요청 실패 -->
      <p v-else-if="errorMessage">{{ errorMessage }}</p>

      <template v-else>
        <p v-if="finalWeatherList.length === 0">검색 결과가 없습니다.</p>

        <!-- 도시별 WeatherCard 생성 -->
        <WeatherCard
          v-for="item in finalWeatherList"
          :key="item.id"
          :city-item="item"
          @select-card="(message) => (selectedCityInfo = message)"
          @click-detail="goDetail"
        />
      </template>

      <p class="data-source">
        날씨 데이터 출처:
        <a href="https://openweathermap.org/" target="_blank" rel="noopener noreferrer">
          OpenWeather
        </a>
      </p>
    </BaseDashboardCard>

    <p class="status-bar">{{ selectedCityInfo }}</p>
  </div>
</template>

<style scoped>
.dashboard-wrapper h2 {
  margin-top: 0;
  color: #284f69;
  font-size: 1.15rem;
}

.search-divider {
  height: 1px;
  margin: 24px 0;
  background: #dfe7ec;
}

.data-source {
  margin: 16px 0 0;
  color: #7a8992;
  font-size: 0.78rem;
  text-align: right;
}

.data-source a {
  color: #5d7d91;
  text-decoration: none;
}

.data-source a:hover {
  text-decoration: underline;
}

.status-bar {
  padding: 12px;
  border: 1px solid #bcd9cd;
  border-radius: 8px;
  background: #edf7f3;
  color: #356b58;
  text-align: center;
}
</style>
