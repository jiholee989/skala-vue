<script setup>
const props = defineProps({
  minFeelsLike: {
    type: [String, Number],
    default: '',
  },
  minHumidity: {
    type: [String, Number],
    default: '',
  },
})

const emit = defineEmits([
  'update-feels-like',
  'update-humidity',
  'apply-filter',
  'reset-filter',
])
</script>

<template>
  <div class="weather-filter">
    <div class="filter-fields">
      <div class="filter-field">
        <p>🌡️ 체감온도 기준 이상만 보기</p>
        <input
          type="number"
          :value="props.minFeelsLike"
          placeholder="체감 온도 입력"
          @input="emit('update-feels-like', $event.target.value)"
        />
      </div>

      <div class="filter-field">
        <p>🐠 습도 기준 이상만 보기</p>
        <input
          type="number"
          :value="props.minHumidity"
          placeholder="기준 습도 입력"
          @input="emit('update-humidity', $event.target.value)"
        />
      </div>

      <button class="reset-button" type="button" @click="emit('reset-filter')">초기화</button>
    </div>

    <button class="search-button" type="button" @click="emit('apply-filter')">검색</button>
  </div>
</template>

<style scoped>
.filter-fields {
  display: flex;
  gap: 14px;
}

.filter-field {
  flex: 1;
  min-width: 0;
}

.filter-field p {
  margin: 0 0 8px;
}

.weather-filter input {
  width: 100%;
  padding: 11px 13px;
  border: 1px solid #c9dce9;
  border-radius: 8px;
  outline: none;
}

.weather-filter button {
  padding: 11px 16px;
  border-radius: 8px;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.2s,
    border-color 0.2s,
    box-shadow 0.2s,
    transform 0.1s;
}

.search-button {
  width: 100%;
  margin-top: 14px;
  border: 1px solid #315f7d;
  background: #315f7d;
  color: #ffffff;
}

.search-button:hover {
  border-color: #284f69;
  background: #284f69;
}

.reset-button {
  align-self: flex-end;
  flex: 0 0 auto;
  padding: 10px 12px;
  border: 1px solid #c9d6de;
  background: #f7f9fa;
  color: #526875;
}

.reset-button:hover {
  border-color: #aebfc9;
  background: #edf2f5;
}

.weather-filter button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(104, 169, 210, 0.3);
}

.weather-filter button:active {
  transform: translateY(1px);
}

@media (max-width: 560px) {
  .filter-fields {
    flex-direction: column;
  }

  .reset-button {
    align-self: flex-end;
  }
}
</style>
