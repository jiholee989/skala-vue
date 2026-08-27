<script setup>
const props = defineProps({
  currentQuery: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['update-query'])
</script>

<template>
  <input
    class="search-input"
    type="text"
    :value="props.currentQuery"
    placeholder="검색할 도시 이름 입력"
    @input="emit('update-query', $event.target.value)"
  />
</template>

<style scoped>
.search-input {
  width: 100%;
  padding: 11px 13px;
  border: 1px solid #c9dce9;
  border-radius: 8px;
  outline: none;
}

.search-input:focus {
  border-color: #68a9d2;
  box-shadow: 0 0 0 2px rgba(104, 169, 210, 0.18);
}
</style>
