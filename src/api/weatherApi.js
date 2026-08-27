import axios from 'axios'

const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  timeout: 7000,
})

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

function assertApiKey() {
  if (!API_KEY) {
    throw new Error('VITE_OPENWEATHER_API_KEY가 설정되지 않았습니다.')
  }
}

// prettier-ignore
const CITY_LIST = [
  { id: 'city_01', name: '서울', lat: 37.5665, lon: 126.9780 },
  { id: 'city_02', name: '수원', lat: 37.2636, lon: 127.0286 },
  { id: 'city_03', name: '부산', lat: 35.1796, lon: 129.0756 },
  { id: 'city_04', name: '제주', lat: 33.4996, lon: 126.5312 },
  { id: 'city_05', name: '대전', lat: 36.3504, lon: 127.3845 },
  { id: 'city_06', name: '인천', lat: 37.4563, lon: 126.7052 },
  { id: 'city_07', name: '광주', lat: 35.1595, lon: 126.8526 },
  { id: 'city_08', name: '대구', lat: 35.8714, lon: 128.6014 },
  { id: 'city_09', name: '울산', lat: 35.5384, lon: 129.3114 },
  { id: 'city_10', name: '강릉', lat: 37.7519, lon: 128.8761 },
]

async function requestWeather(city) {
  assertApiKey()

  const { data } = await weatherApi.get('/weather', {
    params: {
      lat: city.lat,
      lon: city.lon,
      appid: API_KEY,
      units: 'metric',
      lang: 'kr',
    },
  })

  return data
}

//air pollution API 추가
async function requestAirPollution(city) {
  assertApiKey()

  const { data } = await weatherApi.get('/air_pollution', {
    params: {
      lat: city.lat,
      lon: city.lon,
      appid: API_KEY,
    },
  })

  return data
}

function getAirQualityLabel(aqi) {
  const labels = {
    1: '좋음',
    2: '양호',
    3: '보통',
    4: '나쁨',
    5: '매우 나쁨',
  }

  return labels[aqi] ?? '정보 없음'
}

function normalizeWeather(city, data) {
  return {
    id: city.id,
    name: city.name,
    temp: data.main.temp,
    feelsLike: data.main.feels_like,
    status: data.weather?.[0]?.description ?? '정보 없음',
    icon: data.weather?.[0]?.icon ?? '',
    humidity: data.main.humidity,
    wind: data.wind.speed,
  }
}

export async function fetchWeatherList() {
  return Promise.all(
    CITY_LIST.map(async (city) => {
      const data = await requestWeather(city)

      return normalizeWeather(city, data)
    }),
  )
}

export async function fetchWeatherDetail(cityId) {
  const city = CITY_LIST.find((item) => item.id === cityId)

  if (!city) return null

  const [weatherData, airData] = await Promise.all([
    requestWeather(city),
    requestAirPollution(city),
  ])

  const airInfo = airData.list?.[0]

  return {
    ...normalizeWeather(city, weatherData),
    airQuality: getAirQualityLabel(airInfo?.main?.aqi),
    pm10: Math.round(airInfo?.components?.pm10 ?? 0),
    pm25: Math.round(airInfo?.components?.pm2_5 ?? 0),
  }
}
