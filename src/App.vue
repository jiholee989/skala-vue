<script setup>
import { provide } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import UnitToggler from '@/components/weather/UnitToggler.vue'

const route = useRoute()
provide('appTitle', 'Vue Weather Dashboard')
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <h1>✴ Weather Dashboard ✴</h1>

      <nav class="main-nav">
        <RouterLink class="nav-link" to="/">🌤️ 날씨 대시보드</RouterLink>
        <RouterLink class="nav-link" to="/about">ℹ️ 서비스 소개</RouterLink>

        <UnitToggler v-if="['WeatherHome', 'WeatherDetail'].includes(route.name)" />
      </nav>
    </header>

    <RouterView />
  </div>
</template>

<style scoped>
.app-header {
  margin-bottom: 24px;
}

.main-nav {
  display: flex;
  gap: 10px;
  padding: 10px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-surface);
}

.nav-link {
  /* flex: 1; */
  padding: 10px 14px;
  border-radius: 8px;
  color: #3f86b1;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
}

.nav-link:hover {
  background: var(--color-primary-light);
}

.nav-link.router-link-exact-active {
  background: var(--color-primary);
  color: #ffffff;
}
</style>
