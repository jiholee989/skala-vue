<script setup>
// import { ref } from 'vue'
import { computed, ref, watch, watchEffect } from 'vue'

// 가상 날씨 데이터
const weatherList = ref([
  {
    id: 'city_01',
    name: '서울',
    temp: 28,
    feelsLike: 30,
    status: '맑음',
    humidity: 55,
    fineDust: '보통',
  },
  {
    id: 'city_02',
    name: '수원',
    temp: 24,
    feelsLike: 23,
    status: '비',
    humidity: 82,
    fineDust: '좋음',
  },
  {
    id: 'city_03',
    name: '부산',
    temp: 26,
    feelsLike: 27,
    status: '구름',
    humidity: 68,
    fineDust: '보통',
  },
  {
    id: 'city_04',
    name: '제주',
    temp: 23,
    feelsLike: 24,
    status: '흐림',
    humidity: 75,
    fineDust: '좋음',
  },
  {
    id: 'city_05',
    name: '대전',
    temp: 29,
    feelsLike: 31,
    status: '맑음',
    humidity: 48,
    fineDust: '나쁨',
  },
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

//체감 온도/습도 computed
const finalWeatherList = computed(() => {
  let result = filteredWeatherList.value

  // 체감온도가 입력된 경우
  if (minFeelsLike.value !== '') {
    result = result.filter((item) => item.feelsLike >= Number(minFeelsLike.value))
  }
  // 습도가 입력된 경우
  if (minHumidity.value !== '') {
    result = result.filter((item) => item.humidity >= Number(minHumidity.value))
  }
  return result
})

//watch
watch([minFeelsLike, minHumidity], ([newTemp, newHumidity]) => {
  console.log('[watch] 최소 체감온도:', newTemp)
  console.log('[watch] 최소 습도:', newHumidity)
})

function showDetail(cityName, status) {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>

<template>
  <div class="dashboard-wrapper">
    <section class="search-box">
      <h2>🔎 도시 검색 🗺️</h2>
      <input
        type="text"
        :value="searchQuery"
        placeholder="검색할 도시 이름 입력"
        @input="searchQuery = $event.target.value"
      />
      <p>
        검색 중인 도시: <strong>{{ searchQuery }}</strong>
      </p>
      <br />

      <h2>🔎 필터링 🗂️</h2>
      <p>🌡️ 체감온도 기준 이상만 보기</p>
      <input v-model="minFeelsLike" type="number" placeholder="체감 온도 입력" />
      <p>🐠 습도 기준 이상만 보기</p>
      <input v-model="minHumidity" type="number" placeholder="기준 습도 입력" />
    </section>

    <section class="list-box">
      <h2>🏞️ 지역별 날씨 현황 🌤️</h2>

      <p v-if="finalWeatherList.length === 0">검색 결과가 없습니다.</p>

      <!--v-for="item in weatherList-->
      <article
        v-for="item in finalWeatherList"
        a
        :key="item.id"
        class="weather-card"
        @click="selectedCityInfo = `${item.name}이 선택되었습니다.`"
      >
        <h3>{{ item.name }} ({{ item.status }})</h3>
        <p>
          현재 기온: {{ item.temp }}℃ | 체감 온도: {{ item.feelsLike }}℃ | 습도:{{ item.humidity }}%
          | 미세먼지: {{ item.fineDust }}
        </p>

        <span v-if="item.temp >= 25" class="temperature-label hot">☀️ 더움(25도 이상)</span>
        <!--조건부 렌더링 (v-if)-->
        <span v-else class="temperature-label cool">🍃 선선함(25도 미만)</span>

        <button @click.stop="showDetail(item.name, item.status)">상세보기</button>
        <!--.stop으로 버블링 방지-->
      </article>
    </section>

    <p class="status-bar">{{ selectedCityInfo }}</p>
  </div>
</template>
