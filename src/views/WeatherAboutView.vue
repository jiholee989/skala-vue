<script setup>
import { inject } from 'vue'
import { RouterLink } from 'vue-router'

const appTitle = inject('appTitle', 'Weather Dashboard')
</script>

<template>
  <section class="about-view">
    <h2>서비스 소개</h2>
    <p><strong>{{ appTitle }}</strong>는 Vue 3 학습을 위한 날씨 대시보드입니다.</p>
    <p>Vue Router를 이용하여 날씨 목록과 지역별 상세 페이지를 연결합니다.</p>
    <RouterLink to="/">메인 대시보드로 돌아가기</RouterLink>
  </section>
</template>

<style scoped>
.about-view {
  padding: 20px;
  border: 1px solid #dcdfe6;
  border-radius: 10px;
  background: #ffffff;
}
</style>
