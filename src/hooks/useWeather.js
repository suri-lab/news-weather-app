import { useState, useEffect, useCallback } from 'react';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0/direct';

export function useWeather(initialCity = '부산') {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState(initialCity);

  const fetchWeather = useCallback(async (targetCity) => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

    if (!apiKey || apiKey === 'your_key_here') {
      setWeather(getMockWeatherData(targetCity));
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1단계: 지명 → 좌표 변환 (한글/영문 모두 지원, KR로 범위 좁힘)
      const geoRes = await fetch(
        `${GEO_URL}?q=${encodeURIComponent(targetCity)},KR&limit=1&appid=${apiKey}`
      );
      const geoData = await geoRes.json();

      if (!geoData || geoData.length === 0) {
        throw new Error('지역을 찾을 수 없습니다. 다른 지역명을 입력해주세요.');
      }

      const { lat, lon, name, local_names } = geoData[0];
      const displayName = local_names?.ko || name;

      // 2단계: 좌표 → 날씨 조회
      const res = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`
      );

      if (!res.ok) {
        if (res.status === 401) throw new Error('API 키가 아직 활성화 중입니다. 신규 키는 최대 2시간 소요됩니다.');
        throw new Error('날씨 정보를 불러오는 데 실패했습니다.');
      }

      const data = await res.json();
      // 표시 도시명을 한국어로 덮어쓰기
      data.name = displayName;
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather(city);
  }, [city, fetchWeather]);

  const searchCity = (newCity) => {
    setCity(newCity);
  };

  return { weather, loading, error, city, searchCity };
}

function getMockWeatherData(city) {
  return {
    name: city,
    main: { temp: 24.5, feels_like: 26.1, humidity: 68, temp_min: 21.0, temp_max: 27.0 },
    weather: [{ id: 800, main: 'Clear', description: '맑음', icon: '01d' }],
    wind: { speed: 3.2 },
    sys: { country: 'KR' },
  };
}
