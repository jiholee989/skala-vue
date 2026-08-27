# Weather Dashboard

Vue 3와 OpenWeather API를 활용한 지역별 날씨 대시보드입니다. 국내 10개 도시의 현재 날씨를 조회하고 검색·필터링·상세 정보 기능을 제공합니다.

## 주요 기능

- 국내 10개 도시의 현재 날씨 조회
- 도시 이름 검색
- 체감온도와 습도 기준 필터링
- 섭씨(℃)·화씨(℉) 단위 변경
- 도시별 기온, 날씨, 습도, 풍속 상세 조회
- 대기질, 미세먼지(PM10), 초미세먼지(PM2.5) 조회
- 로딩·오류·404 화면 처리

## 사용 기술

- Vue 3
- Vite
- Vue Router
- Pinia
- Axios
- OpenWeather Current Weather API
- OpenWeather Air Pollution API

## UI 라이브러리 적용

Vue 3용 UI 라이브러리인 Element Plus를 전역 등록하여 입력, 버튼, 상태 표시 UI에 적용했습니다.

- `el-input`: 도시 검색, 체감온도·습도 입력
- `el-switch`: 섭씨·화씨 단위 전환
- `el-button`: 검색, 초기화, 상세보기, 메인 화면 이동
- `el-tag`: 더움·선선함 상태 표시
- `el-skeleton`: 날씨 데이터 로딩 상태
- `el-alert`: API 오류 메시지
- `el-empty`: 검색 결과 없음 안내

## 데이터 출처

- 현재 기온, 체감온도, 날씨, 습도, 풍속: [OpenWeather Current Weather Data](https://openweathermap.org/current)
- 대기질, 미세먼지(PM10), 초미세먼지(PM2.5): [OpenWeather Air Pollution API](https://openweathermap.org/api/air-pollution)
- API 서비스 및 데이터 제공자: [OpenWeather](https://openweathermap.org/)

화면에 표시되는 값은 고정된 예제 데이터가 아니라, 페이지를 불러올 때 OpenWeather API에서 요청한 현재 데이터입니다. 관측·모델 갱신 시점에 따라 실제 기상 상황과 약간의 시간 차이가 있을 수 있습니다.

## 실행 방법

요구 Node.js 버전은 `20.19.0` 이상입니다.

```sh
npm install
```

프로젝트 루트에 `.env.local` 파일을 만들고 OpenWeather API Key를 입력합니다.

```env
VITE_OPENWEATHER_API_KEY=YOUR_API_KEY
```

환경변수를 추가하거나 변경한 뒤에는 개발 서버를 다시 시작합니다.

```sh
npm run dev
```

## 주요 명령어

```sh
npm run dev      # 개발 서버 실행
npm run build    # 프로덕션 빌드
npm run preview  # 빌드 결과 미리보기
npm run lint     # 코드 검사 및 자동 수정
npm run format   # 코드 포맷팅
```

## 프로젝트 구조

```text
src/
├── api/          # OpenWeather API 통신
├── components/   # 검색, 필터, 날씨 카드 등 UI
├── stores/       # 온도 단위와 검색 조건 상태
├── utils/        # 온도 변환 공통 함수
├── views/        # 메인, 상세, 소개, 404 화면
├── App.vue
└── main.js
```

> `.env.local`에는 실제 API Key가 포함되므로 Git에 커밋하지 않습니다. 공유용 환경변수 형식은 `.env.example`을 참고하세요.
