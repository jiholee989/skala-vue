<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <section class="not-found">
    <h1>404</h1>
    <h2>페이지를 찾을 수 없습니다.</h2>
    <p>요청한 주소가 존재하지 않거나 아직 개발되지 않았습니다.</p>
    <button @click="router.push({ name: 'WeatherHome' })">날씨 메인으로 이동</button>
  </section>
</template>

<style scoped>
.not-found {
  padding: 40px 20px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-surface);
  text-align: center;
}

button {
  margin-top: 16px;
  padding: 8px 12px;
  cursor: pointer;
}
</style>
