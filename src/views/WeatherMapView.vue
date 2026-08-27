<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { fetchWeatherList } from '@/api/weatherApi'
import { useConfigStore } from '@/stores/configStore'
import { toDisplayTemperature } from '@/utils/temperature'

const router = useRouter()
const configStore = useConfigStore()

const weatherList = ref([])
const isLoading = ref(false)
const errorMessage = ref('')

// 지도 박스 안에서 각 도시가 표시될 위치
const cityPositions = {
  city_01: { left: 37, top: 18 }, // 서울
  city_02: { left: 42, top: 29 }, // 수원
  city_03: { left: 73, top: 73 }, // 부산
  city_04: { left: 28, top: 92 }, // 제주
  city_05: { left: 45, top: 48 }, // 대전
  city_06: { left: 22, top: 22 }, // 인천
  city_07: { left: 31, top: 68 }, // 광주
  city_08: { left: 65, top: 55 }, // 대구
  city_09: { left: 79, top: 62 }, // 울산
  city_10: { left: 71, top: 24 }, // 강릉
}

const mapWeatherList = computed(() =>
  weatherList.value.map((city) => ({
    ...city,
    ...cityPositions[city.id],
    displayTemp: toDisplayTemperature(city.temp, configStore.unit),
  })),
)

function getWeatherIconUrl(icon) {
  return `https://openweathermap.org/img/wn/${icon}.png`
}

async function loadWeatherMap() {
  isLoading.value = true
  errorMessage.value = ''

  try {
    weatherList.value = await fetchWeatherList()
  } catch (error) {
    console.error('전국 날씨 요청 실패:', error)
    errorMessage.value = '전국 날씨 정보를 불러오지 못했습니다.'
  } finally {
    isLoading.value = false
  }
}

onMounted(loadWeatherMap)
</script>

<template>
  <section class="weather-map-view">
    <h2>🗺️ 전국 날씨 한눈에 보기</h2>
    <p class="map-description">도시를 클릭하면 상세 날씨를 확인할 수 있습니다.</p>

    <el-skeleton v-if="isLoading" :rows="8" animated />

    <el-alert
      v-else-if="errorMessage"
      :title="errorMessage"
      type="error"
      show-icon
      :closable="false"
    />

    <div v-else class="korea-map">
      <button
        v-for="city in mapWeatherList"
        :key="city.id"
        class="city-marker"
        type="button"
        :style="{ left: `${city.left}%`, top: `${city.top}%` }"
        @click="router.push(`/weather/${city.id}`)"
      >
        <img v-if="city.icon" :src="getWeatherIconUrl(city.icon)" :alt="`${city.status} 아이콘`" />
        <span class="city-name">{{ city.name }}</span>
        <strong>{{ city.displayTemp }}{{ configStore.unitSymbol }}</strong>
      </button>
    </div>

    <p class="map-note">※ 실제 행정구역 지도가 아닌 도시 위치를 간략하게 표현한 배치도입니다.</p>
  </section>
</template>

<style scoped>
.weather-map-view {
  padding: 24px 32px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-surface);
}

.weather-map-view h2 {
  margin: 0 0 8px;
  color: #397895;
}

.map-description {
  margin: 0 0 20px;
  color: var(--color-muted);
}

.korea-map {
  position: relative;
  overflow: hidden;
  width: min(100%, 620px);
  height: 620px;
  margin: 0 auto;
  border: 1px solid #c7e1ee;
  border-radius: 16px;
  background: linear-gradient(160deg, #e7f6fc, #d9eef7);
}

/* 간략하게 표현한 한반도 육지 모양 */
.korea-map::before {
  position: absolute;
  inset: 2% 7% 8%;
  border: 2px solid #b8d9cc;
  background: linear-gradient(150deg, #f2faf6, #dcefe6);
  clip-path: polygon(
    43% 0%,
    58% 3%,
    68% 10%,
    72% 19%,
    68% 27%,
    77% 36%,
    73% 47%,
    80% 57%,
    72% 68%,
    66% 80%,
    55% 90%,
    43% 92%,
    34% 85%,
    26% 76%,
    19% 67%,
    25% 57%,
    17% 47%,
    23% 38%,
    19% 28%,
    27% 20%,
    30% 11%
  );
  content: '';
}

/* 제주도 */
.korea-map::after {
  position: absolute;
  bottom: 3%;
  left: 20%;
  width: 96px;
  height: 30px;
  border: 2px solid #b8d9cc;
  border-radius: 50%;
  background: #e2f1e9;
  content: '';
  transform: rotate(-10deg);
}

.city-marker {
  position: absolute;
  z-index: 1;
  display: grid;
  grid-template-columns: 32px auto;
  align-items: center;
  min-width: 92px;
  padding: 5px 9px;
  border: 1px solid #b9dcd1;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.94);
  color: var(--color-text);
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(50, 75, 90, 0.1);
  transform: translate(-50%, -50%);
}

.city-marker:hover {
  border-color: var(--color-primary);
  background: var(--color-primary-light);
}

.city-marker img {
  grid-row: 1 / 3;
  width: 32px;
  height: 32px;
}

.city-name {
  font-size: 0.78rem;
}

.city-marker strong {
  color: #397895;
  font-size: 0.9rem;
}

.map-note {
  margin: 14px 0 0;
  color: var(--color-muted);
  font-size: 0.75rem;
  text-align: center;
}

@media (max-width: 560px) {
  .weather-map-view {
    padding: 20px 14px;
  }

  .korea-map {
    height: 540px;
  }

  .korea-map::after {
    width: 58px;
    height: 22px;
  }

  .city-marker {
    grid-template-columns: 25px auto;
    min-width: 76px;
    padding: 4px 6px;
  }

  .city-marker img {
    width: 25px;
    height: 25px;
  }

  .city-name {
    font-size: 0.7rem;
  }

  .city-marker strong {
    font-size: 0.78rem;
  }
}
</style>
