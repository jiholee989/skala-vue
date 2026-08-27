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

const emit = defineEmits(['update-feels-like', 'update-humidity', 'apply-filter'])
</script>

<template>
  <div class="weather-filter">
    <p>🌡️ 체감온도 기준 이상만 보기</p>
    <input
      type="number"
      :value="props.minFeelsLike"
      placeholder="체감 온도 입력"
      @input="emit('update-feels-like', $event.target.value)"
    />

    <p>🐠 습도 기준 이상만 보기</p>
    <input
      type="number"
      :value="props.minHumidity"
      placeholder="기준 습도 입력"
      @input="emit('update-humidity', $event.target.value)"
    />

    <button @click="emit('apply-filter')">필터링</button>
  </div>
</template>

<style scoped>
.weather-filter input {
  width: 100%;
  padding: 11px 13px;
  border: 1px solid #c9dce9;
  border-radius: 8px;
  outline: none;
}

.weather-filter button {
  margin-top: 14px;
  padding: 8px 14px;
  cursor: pointer;
}
</style>
