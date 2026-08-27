<!--
WeatherParent.vue        ← 부모
├── BaseDashboardCard.vue   ← 검색/목록 공통 흰색 박스
├── SearchBar.vue           ← 검색 input
├── SearchFilter.vue           ← 추가 - 검색 필터링
└── WeatherCard.vue         ← 도시 한 개의 카드
-->

<script setup>
// import { ref } from 'vue'
import { computed, ref, watch, watchEffect } from 'vue'

//자식 component import 추가
import BaseDashboardCard from '../exercise/BaseDashboardCard.vue/index.js'
import SearchBar from '../exercise/SearchBar.vue'
import WeatherCard from '../exercise/WeatherCard.vue'
//추가 필터링 기능
import SearchFilter from '../exercise/SearchFilter.vue'

// 가상 날씨 데이터
// prettier-ignore
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, feelsLike: 30, status: '맑음', humidity: 55, fineDust: '보통' },
  { id: 'city_02', name: '수원', temp: 24, feelsLike: 23, status: '비', humidity: 82, fineDust: '좋음' },
  { id: 'city_03', name: '부산', temp: 26, feelsLike: 27, status: '구름', humidity: 68, fineDust: '보통' },
  { id: 'city_04', name: '제주', temp: 23, feelsLike: 24, status: '흐림', humidity: 75, fineDust: '좋음' },
  { id: 'city_05', name: '대전', temp: 29, feelsLike: 31, status: '맑음', humidity: 48, fineDust: '나쁨' },
])

const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')

const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim()
  if (!query) return weatherList.value // 검색어가 없으면 전체 목록을 그대로 반환
  return weatherList.value.filter((item) => item.name.includes(query))
})

// 본인만의 반응형 상태 변수 추가 - 체감온도 & 습도 검색 필터링
const minFeelsLike = ref('')
const minHumidity = ref('')

const appliedFeelsLike = ref('')
const appliedHumidity = ref('')

//체감 온도/습도 computed
const finalWeatherList = computed(() => {
  let result = filteredWeatherList.value
  // 체감온도가 입력된 경우
  if (appliedFeelsLike.value !== '') {
    result = result.filter((item) => item.feelsLike >= Number(appliedFeelsLike.value))
  }
  // 습도가 입력된 경우
  if (appliedHumidity.value !== '') {
    result = result.filter((item) => item.humidity >= Number(appliedHumidity.value))
  }
  return result
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

//watch
watch([minFeelsLike, minHumidity], ([newTemp, newHumidity]) => {
  console.log('[watch] 최소 체감온도:', newTemp)
  console.log('[watch] 최소 습도:', newHumidity)
})

function showDetail(cityName, status) {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}

function applyFilter() {
  appliedFeelsLike.value = minFeelsLike.value
  appliedHumidity.value = minHumidity.value
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
      <br />

      <h2>🔎 필터링 🗂️</h2>
      <SearchFilter
        :min-feels-like="minFeelsLike"
        :min-humidity="minHumidity"
        @update-feels-like="minFeelsLike = $event"
        @update-humidity="minHumidity = $event"
        @apply-filter="applyFilter"
      />
    </BaseDashboardCard>

    <!-- 날씨 목록 박스 -->
    <BaseDashboardCard>
      <template #title>
        <h2>🏞️ 지역별 날씨 현황 🌤️</h2>
      </template>

      <p v-if="finalWeatherList.length === 0">검색 결과가 없습니다.</p>

      <!--v-for은 부모에 유지-->
      <!-- 도시별 WeatherCard 생성 -->
      <WeatherCard
        v-for="item in finalWeatherList"
        :key="item.id"
        :city-item="item"
        @select-card="(message) => (selectedCityInfo = message)"
        @click-detail="(city) => showDetail(city.name, city.status)"
      />
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

.dashboard-wrapper input {
  width: 100%;
  padding: 11px 13px;
  border: 1px solid #c9dce9;
  border-radius: 8px;
  outline: none;
  background: #ffffff;
  color: inherit;
  font: inherit;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.dashboard-wrapper input:focus {
  border-color: #68a9d2;
  box-shadow: 0 0 0 2px rgba(104, 169, 210, 0.18);
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
