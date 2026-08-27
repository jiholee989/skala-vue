// 섭씨 값을 현재 선택한 단위로 바꾸고 화면 표시용 정수로 반환합니다.
export function toDisplayTemperature(celsius, unit) {
  const temperature = unit === 'fahrenheit' ? (Number(celsius) * 9) / 5 + 32 : Number(celsius)

  return Math.round(temperature)
}

// 사용자가 입력한 온도를 필터 비교 기준인 섭씨로 바꿉니다.
export function toCelsius(temperature, unit) {
  const value = Number(temperature)

  return unit === 'fahrenheit' ? ((value - 32) * 5) / 9 : value
}
