<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'
import { toDisplayTemperature } from '@/utils/temperature'

const props = defineProps({
  cityItem: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['select-card', 'click-detail'])

const configStore = useConfigStore()
const displayTemp = computed(() =>
  toDisplayTemperature(props.cityItem.temp, configStore.unit),
)
const displayFeelsLike = computed(() =>
  toDisplayTemperature(props.cityItem.feelsLike, configStore.unit),
)
</script>

<template>
  <article
    class="weather-card"
    @click="emit('select-card', `${props.cityItem.name}이 선택되었습니다.`)"
  >
    <div class="weather-card__body">
      <img
        v-if="props.cityItem.icon"
        class="weather-card__icon"
        :src="`https://openweathermap.org/img/wn/${props.cityItem.icon}@2x.png`"
        :alt="`${props.cityItem.status} 날씨 아이콘`"
      />

      <div class="weather-card__content">
        <h3>{{ props.cityItem.name }} ({{ props.cityItem.status }})</h3>
        <p>
          현재 기온: {{ displayTemp }}{{ configStore.unitSymbol }} | 체감 온도:
          {{ displayFeelsLike }}{{ configStore.unitSymbol }} | 습도: {{ props.cityItem.humidity }}%
        </p>

        <span v-if="props.cityItem.temp >= 25" class="temperature-label hot">
          ☀️ 더움(25도 이상)
        </span>
        <!--조건부 렌더링 (v-if)-->
        <span v-else class="temperature-label cool">🍃 선선함(25도 미만)</span>
      </div>
    </div>

    <button @click.stop="emit('click-detail', props.cityItem.id)">상세보기</button>
    <!--.stop으로 버블링 방지-->
  </article>
</template>

<style scoped>
.weather-card {
  position: relative;
  margin: 12px 0;
  padding: 16px 120px 16px 16px;
  border: 1px solid #d9e1e7;
  border-radius: 8px;
  background: #ffffff;
  cursor: pointer;
  transition:
    border-color 0.2s,
    background 0.2s;
}

.weather-card:hover {
  border-color: #8fb9d2;
  background: #f8fbfd;
}

.weather-card h3 {
  margin: 0;
  color: #294e66;
}

.weather-card__body {
  display: flex;
  align-items: center;
  gap: 14px;
}

.weather-card__icon {
  flex: 0 0 auto;
  width: 72px;
  height: 72px;
  object-fit: contain;
}

.weather-card__content {
  min-width: 0;
}

.weather-card p {
  margin: 7px 0;
}

.weather-card button {
  position: absolute;
  top: 50%;
  right: 16px;
  padding: 8px 12px;
  border: 1px solid #88b9d7;
  border-radius: 7px;
  background: #f1f7fa;
  color: #315f7d;
  cursor: pointer;
  transform: translateY(-50%);
  transition:
    background 0.2s,
    border-color 0.2s;
}

.weather-card button:hover {
  border-color: #5d9fc8;
  background: #e3f0f7;
}

.temperature-label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 24px;
  padding: 3px 7px;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: normal;
  line-height: 1;
  text-align: center;
}

.temperature-label.hot {
  background: rgba(239, 68, 68, 0.8);
  color: white;
}

.temperature-label.cool {
  background: rgba(135, 206, 235, 0.8);
  color: #16324f;
}

@media (max-width: 560px) {
  .weather-card {
    padding-right: 16px;
  }

  .weather-card button {
    position: static;
    display: block;
    margin: 14px 0 0 auto;
    transform: none;
  }

  .weather-card__body {
    align-items: flex-start;
  }

  .weather-card__icon {
    width: 58px;
    height: 58px;
  }
}
</style>
