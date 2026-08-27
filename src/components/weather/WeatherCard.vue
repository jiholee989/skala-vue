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
const displayTemp = computed(() => toDisplayTemperature(props.cityItem.temp, configStore.unit))
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
          현재 기온: {{ displayTemp }}{{ configStore.unitSymbol }} | 체감 온도: {{ displayFeelsLike
          }}{{ configStore.unitSymbol }} | 습도: {{ props.cityItem.humidity }}%
        </p>

        <el-tag v-if="props.cityItem.temp >= 29" type="warning" effect="light"> ☀️ 더움 </el-tag>

        <el-tag v-else type="success" effect="light"> 🍃 선선함 </el-tag>
      </div>
    </div>

    <el-button
      class="detail-button"
      type="primary"
      size="small"
      @click.stop="emit('click-detail', props.cityItem.id)"
    >
      상세보기
    </el-button>
    <!--.stop으로 버블링 방지-->
  </article>
</template>

<style scoped>
.weather-card {
  position: relative;
  margin: 12px 0;
  padding: 16px 120px 16px 16px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
  cursor: pointer;
  transition:
    border-color 0.2s,
    background 0.2s;
}

.weather-card:hover {
  border-color: #8fc5df;
  background: var(--color-primary-light);
}

.weather-card h3 {
  margin: 0;
  color: #397895;
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

.detail-button {
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
}

@media (max-width: 560px) {
  .weather-card {
    padding-right: 16px;
  }

  .detail-button {
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
