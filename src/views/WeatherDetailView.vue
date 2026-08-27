<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const cityData = ref(null)

// prettier-ignore
const mockDetails = {
  city_01: { name: '서울', temp: 28, status: '맑음', humidity: 55, wind: 2.5, fineDust: '보통' },
  city_02: { name: '수원', temp: 24, status: '비', humidity: 82, wind: 4.1, fineDust: '좋음' },
  city_03: { name: '부산', temp: 26, status: '구름', humidity: 68, wind: 5.0, fineDust: '보통' },
  city_04: { name: '제주', temp: 23, status: '흐림', humidity: 75, wind: 6.2, fineDust: '좋음' },
  city_05: { name: '대전', temp: 29, status: '맑음', humidity: 48, wind: 1.8, fineDust: '나쁨' },
}

onMounted(() => {
  cityData.value = mockDetails[String(route.params.cityId)] ?? null
})
</script>

<template>
  <section class="weather-detail">
    <h2>🌡️ 지역별 상세 기상 관측 정보</h2>

    <div v-if="cityData">
      <h3>{{ cityData.name }}</h3>
      <p>기온: {{ cityData.temp }}℃</p>
      <p>날씨: {{ cityData.status }}</p>
      <p>습도: {{ cityData.humidity }}%</p>
      <p>풍속: {{ cityData.wind }}m/s</p>
      <p>미세먼지: {{ cityData.fineDust }}</p>
    </div>

    <p v-else>도시 정보를 찾을 수 없습니다.</p>

    <button @click="router.push('/')">메인 대시보드로 돌아가기</button>
  </section>
</template>

<style scoped>
.weather-detail {
  padding: 20px;
  border: 1px solid #dcdfe6;
  border-radius: 10px;
  background: #ffffff;
}

button {
  margin-top: 16px;
  padding: 8px 12px;
  cursor: pointer;
}
</style>
