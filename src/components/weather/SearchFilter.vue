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

const emit = defineEmits(['update-feels-like', 'update-humidity', 'apply-filter', 'reset-filter'])
</script>

<template>
  <div class="weather-filter">
    <div class="filter-fields">
      <div class="filter-field">
        <p>🌡️ 체감온도 기준 이상만 보기</p>
        <el-input
          type="number"
          :model-value="props.minFeelsLike"
          placeholder="체감 온도 입력"
          clearable
          @update:model-value="emit('update-feels-like', $event)"
        />
      </div>

      <div class="filter-field">
        <p>🐠 습도 기준 이상만 보기</p>
        <el-input
          type="number"
          :model-value="props.minHumidity"
          placeholder="기준 습도 입력"
          clearable
          @update:model-value="emit('update-humidity', $event)"
        />
      </div>

      <el-button class="reset-button" @click="emit('reset-filter')"> 초기화 </el-button>
    </div>

    <el-button class="search-button" type="primary" @click="emit('apply-filter')"> 검색 </el-button>
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

.search-button {
  width: 100%;
  margin-top: 14px;
}

.reset-button {
  align-self: flex-end;
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
