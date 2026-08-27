<script setup>
import { provide } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

provide('appTitle', 'Vue Weather Dashboard')
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <h1>✴ Weather Dashboard ✴</h1>

      <nav class="main-nav">
        <RouterLink class="nav-link" to="/">🌤️ 날씨 대시보드</RouterLink>
        <RouterLink class="nav-link" to="/about">ℹ️ 서비스 소개</RouterLink>
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
  border: 1px solid #d4dee6;
  border-radius: 10px;
  background: #ffffff;
}

.nav-link {
  flex: 1;
  padding: 10px 14px;
  border-radius: 8px;
  color: #315f7d;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
}

.nav-link:hover {
  background: #edf5fa;
}

.nav-link.router-link-exact-active {
  background: #315f7d;
  color: #ffffff;
}
</style>
