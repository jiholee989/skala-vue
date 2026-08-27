# Weather Dashboard

Vue 3와 OpenWeather API를 활용한 지역별 날씨 대시보드입니다. 국내 10개 도시의 현재 날씨를 조회하고 검색·필터링·상세 정보 기능을 제공합니다.

> 배포 주소: 추후 작성

## 주요 기능

- 국내 10개 도시의 현재 날씨 조회
- 도시 이름 검색
- 체감온도와 습도 기준 필터링
- 섭씨(℃)·화씨(℉) 단위 변경
- 도시별 기온, 날씨, 습도, 풍속 상세 조회
- 대기질, 미세먼지(PM10), 초미세먼지(PM2.5) 조회
- 간략한 한국 지도에서 도시별 날씨와 기온 확인
- 지도에 표시된 도시를 클릭하여 상세 화면으로 이동
- 로딩·오류·404 화면 처리

## 화면 구성

- **날씨 대시보드**: 도시 검색, 상세 조건 검색, 지역별 현재 날씨 목록을 제공합니다.
- **전국 날씨**: 국내 10개 도시의 위치와 현재 기온을 간략한 지도 형태로 보여줍니다.
- **날씨 상세보기**: 선택한 도시의 날씨, 습도, 풍속과 대기질 정보를 제공합니다.
- **서비스 소개**: 애플리케이션에서 제공하는 주요 서비스를 안내합니다.
- **404 화면**: 존재하지 않는 주소나 도시로 접근했을 때 안내 화면을 표시합니다.

## 사용 기술

- Vue 3
- Vite
- Vue Router
- Pinia
- Axios
- OpenWeather Current Weather API
- OpenWeather Air Pollution API

## 작성·수정한 내용

### API 통신

- Axios를 이용하여 OpenWeather Current Weather API를 호출했습니다.
- 도시의 위도와 경도를 이용하여 국내 10개 도시의 현재 날씨를 조회했습니다.
- Air Pollution API를 추가하여 대기질, 미세먼지, 초미세먼지 정보를 조회했습니다.
- API Key를 `.env.local` 환경변수로 분리하고 Git에 포함되지 않도록 설정했습니다.

### 상태 관리와 데이터 처리

- Pinia `configStore`에서 섭씨·화씨 단위 상태를 관리했습니다.
- Pinia `filterStore`에서 체감온도·습도 검색 조건을 관리했습니다.
- 공통 온도 변환 함수를 작성하여 메인, 지도, 상세 화면의 중복 계산을 줄였습니다.
- `computed`를 이용하여 도시 검색과 상세 조건 필터링 결과를 계산했습니다.

### 화면과 컴포넌트

- 검색창, 상세 검색, 날씨 카드, 단위 변경 영역을 컴포넌트로 분리했습니다.
- Vue Router를 이용하여 메인, 지도, 상세, 소개, 404 화면을 연결했습니다.
- CSS로 간략한 한반도 배치도를 만들고 도시별 실시간 날씨를 표시했습니다.
- OpenWeather에서 제공하는 날씨 아이콘을 도시 카드와 지도 화면에 적용했습니다.
- 로딩, API 오류, 검색 결과 없음 상태를 각각 구분하여 표시했습니다.

### 코드 품질과 UI

- Element Plus를 적용하여 입력창, 버튼, 스위치, 태그와 상태 표시 UI를 구성했습니다.
- 공통 색상 변수를 사용하여 하늘색·민트색 계열의 화면 테마를 적용했습니다.
- ESLint와 Oxlint로 오류를 검사하고 Prettier로 코드 형식을 정리했습니다.
- 사용하지 않는 기본 예제 코드와 중복 CSS를 정리했습니다.

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

### 1. 패키지 설치

```sh
npm install
```

### 2. 환경변수 설정

프로젝트 루트에 `.env.local` 파일을 만들고 OpenWeather API Key를 입력합니다.

```env
VITE_OPENWEATHER_API_KEY=YOUR_API_KEY
```

환경변수를 추가하거나 변경한 뒤에는 개발 서버를 다시 시작합니다.

### 3. 개발 서버 실행

```sh
npm run dev
```

터미널에 표시된 로컬 주소를 브라우저에서 열어 확인합니다.

### 4. 코드 검사와 빌드

```sh
npm run format
npm run lint
npm run build
npm run preview
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
├── api/          # OpenWeather 날씨·대기질 API 통신
├── components/   # 검색, 필터, 날씨 카드, 대시보드 UI
├── stores/       # 온도 단위와 검색 조건 상태 관리
├── utils/        # 온도 변환 공통 함수
├── views/        # 메인, 지도, 상세, 소개, 404 화면
├── router/       # 화면 URL과 View 연결
├── App.vue
└── main.js
```

## 배포

- 배포 서비스: 추후 작성
- 배포 URL: 추후 작성
- 빌드 명령어: `npm run build`
- 배포 폴더: `dist`

배포 서비스의 환경변수 설정에도 `VITE_OPENWEATHER_API_KEY`를 등록해야 합니다.

## 추가로 작성할 내용

- 구현 과정에서 어려웠던 점: 추후 작성
- 문제를 해결한 방법: 추후 작성
- 추가로 개선하고 싶은 기능: 추후 작성
- 프로젝트를 진행하며 배운 점: 추후 작성

> `.env.local`에는 실제 API Key가 포함되므로 Git에 커밋하지 않습니다. 공유용 환경변수 형식은 `.env.example`을 참고하세요.
