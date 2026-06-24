import { useState, useEffect, useCallback } from 'react';

// OpenWeatherMap API 기본 URL
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// 한글 도시명 → 영문 변환
const CITY_MAP = {
  서울: 'Seoul', 부산: 'Busan', 인천: 'Incheon', 대구: 'Daegu',
  대전: 'Daejeon', 광주: 'Gwangju', 울산: 'Ulsan', 수원: 'Suwon',
  제주: 'Jeju', 춘천: 'Chuncheon', 강릉: 'Gangneung', 전주: 'Jeonju',
  청주: 'Cheongju', 창원: 'Changwon', 포항: 'Pohang', 여수: 'Yeosu',
  경주: 'Gyeongju', 진주: 'Jinju', 목포: 'Mokpo', 평택: 'Pyeongtaek',
  안양: 'Anyang', 성남: 'Seongnam', 고양: 'Goyang', 용인: 'Yongin',
  부천: 'Bucheon', 남양주: 'Namyangju', 화성: 'Hwaseong',
};

export function translateCity(input) {
  const trimmed = input.trim();
  return CITY_MAP[trimmed] || trimmed;
}

export function useWeather(initialCity = '부산') {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState(initialCity);

  const fetchWeather = useCallback(async (targetCity) => {
    const englishCity = translateCity(targetCity);
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

    // API 키 미설정 시 목업 데이터 반환
    if (!apiKey || apiKey === 'your_key_here') {
      setWeather(getMockWeatherData(targetCity));
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${BASE_URL}/weather?q=${encodeURIComponent(englishCity)}&appid=${apiKey}&units=metric&lang=kr`
      );

      if (!res.ok) {
        if (res.status === 404) throw new Error('도시를 찾을 수 없습니다. 다른 도시명을 입력해주세요.');
        if (res.status === 401) throw new Error('API 키가 아직 활성화 중입니다. 신규 키는 최대 2시간 소요됩니다.');
        throw new Error('날씨 정보를 불러오는 데 실패했습니다.');
      }

      const data = await res.json();
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

// API 키 없을 때 사용하는 목업 데이터
function getMockWeatherData(city) {
  return {
    name: city,
    main: {
      temp: 24.5,
      feels_like: 26.1,
      humidity: 68,
      temp_min: 21.0,
      temp_max: 27.0,
    },
    weather: [{ id: 800, main: 'Clear', description: '맑음', icon: '01d' }],
    wind: { speed: 3.2 },
    sys: { country: 'KR' },
  };
}
