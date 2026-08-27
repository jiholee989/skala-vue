<script setup>
import { inject } from 'vue'
import { RouterLink } from 'vue-router'

const appTitle = inject('appTitle', 'Weather Dashboard')
</script>

<template>
  <section class="about-view">
    <h2>ℹ | 서비스 소개</h2>
    <p>
      <strong>{{ appTitle }}</strong
      >는 OpenWeather API를 활용해 국내 주요 도시의 현재 날씨를 제공하는 서비스입니다.
    </p>
    <p>도시별 날씨를 검색하고 지도와 상세 화면에서 기상 및 대기질 정보를 확인할 수 있습니다.</p>

    <article class="service-guide">
      <h3>🛎️ 제공하는 서비스🤵🏻‍♂️</h3>
      <ul>
        <li>
          <strong>🔎 도시 검색</strong><span>도시 이름으로 원하는 지역을 빠르게 찾습니다.</span>
        </li>
        <li>
          <strong>🗺️ 전국 날씨 지도</strong
          ><span>지도에서 국내 10개 도시의 위치와 현재 기온을 한눈에 확인합니다.</span>
        </li>
        <li>
          <strong>🐠 상세 날씨</strong
          ><span>기온, 체감온도, 습도, 풍속 등 상세 기상 정보를 제공합니다.</span>
        </li>
        <li>
          <strong>☁️ 대기질 정보</strong
          ><span>도시별 대기질과 미세먼지(PM10), 초미세먼지(PM2.5)를 확인합니다.</span>
        </li>
        <li>
          <strong>🗂️ 조건별 필터</strong><span>체감온도와 습도를 기준으로 날씨를 확인합니다.</span>
        </li>
        <li><strong>📏 단위 변경</strong><span>기온을 섭씨 또는 화씨로 전환합니다.</span></li>
      </ul>
    </article>

    <p>↻ <RouterLink to="/">메인 대시보드로 돌아가기</RouterLink></p>
  </section>
</template>

<style scoped>
.about-view {
  padding: 28px 36px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-surface);
}

.service-guide {
  margin: 22px 0;
  padding: 18px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-primary-light);
}

.service-guide h3 {
  margin: 0 0 14px;
  color: #456673;
  font-size: 1.05rem;
}

.service-guide ul {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.service-guide li {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  border: 1px solid #d8ebe5;
  border-radius: 8px;
  background: #f7fbfa;
  color: var(--color-muted);
  font-size: 0.82rem;
  line-height: 1.45;
}

.service-guide li strong {
  color: #3f7d70;
  font-size: 0.9rem;
}

@media (max-width: 840px) {
  .service-guide ul {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .about-view {
    padding: 22px 20px;
  }

  .service-guide ul {
    grid-template-columns: 1fr;
  }
}
</style>
