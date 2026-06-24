import { Droplets, Wind, Thermometer, MapPin } from 'lucide-react';
import SearchBar from './SearchBar';

// 날씨 코드 → 한국어 설명
function getWeatherDesc(id) {
  if (!id) return '';
  if (id >= 200 && id < 300) return '천둥번개';
  if (id >= 300 && id < 400) return '이슬비';
  if (id === 500) return '비';
  if (id === 501) return '비';
  if (id >= 502 && id <= 504) return '폭우';
  if (id === 511) return '진눈깨비';
  if (id >= 520 && id < 600) return '소나기';
  if (id >= 600 && id < 700) return '눈';
  if (id === 701 || id === 741) return '안개';
  if (id === 711) return '연기';
  if (id === 721) return '박무';
  if (id === 731 || id === 761) return '황사';
  if (id === 771) return '돌풍';
  if (id === 781) return '태풍';
  if (id === 800) return '맑음';
  if (id === 801) return '구름 조금';
  if (id === 802) return '구름 약간';
  if (id === 803) return '구름 많음';
  if (id === 804) return '흐림';
  return '맑음';
}

// 날씨 위젯 컴포넌트
export default function WeatherWidget({ weather, loading, error, onSearch }) {
  // 날씨 상태에 따른 배경 그라디언트 결정
  const getBg = (weatherId) => {
    if (!weatherId) return 'from-blue-400 to-blue-600';
    if (weatherId >= 200 && weatherId < 300) return 'from-gray-600 to-gray-800'; // 천둥
    if (weatherId >= 300 && weatherId < 600) return 'from-blue-500 to-blue-700'; // 비
    if (weatherId >= 600 && weatherId < 700) return 'from-blue-200 to-blue-400'; // 눈
    if (weatherId >= 700 && weatherId < 800) return 'from-gray-400 to-gray-600'; // 안개
    if (weatherId === 800) return 'from-sky-400 to-blue-500';                     // 맑음
    return 'from-blue-300 to-blue-500';                                           // 구름
  };

  const weatherId = weather?.weather?.[0]?.id;
  const bgClass = `bg-gradient-to-br ${getBg(weatherId)}`;

  return (
    <div className={`${bgClass} rounded-2xl p-6 text-white shadow-xl h-full flex flex-col`}>
      <h2 className="text-lg font-bold mb-1 opacity-90">날씨</h2>

      {/* 로딩 상태 */}
      {loading && (
        <div className="flex-1 flex flex-col items-center justify-center gap-3">
          <div className="w-10 h-10 border-4 border-white/40 border-t-white rounded-full animate-spin" />
          <p className="text-white/80 text-sm">데이터를 불러오는 중...</p>
        </div>
      )}

      {/* 에러 상태 */}
      {!loading && error && (
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-4xl mb-3">⚠️</p>
              <p className="text-white/90 text-sm">{error}</p>
            </div>
          </div>
          <SearchBar onSearch={onSearch} placeholder="다시 검색..." />
        </div>
      )}

      {/* 날씨 데이터 */}
      {!loading && !error && weather && (
        <div className="flex-1 flex flex-col justify-between">
          {/* 도시명 */}
          <div className="flex items-center gap-1 text-white/80 text-sm">
            <MapPin size={14} />
            <span>{weather.name}, {weather.sys?.country}</span>
          </div>

          {/* 메인 날씨 정보 */}
          <div className="text-center my-4">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              className="w-20 h-20 mx-auto drop-shadow-lg"
            />
            <p className="text-6xl font-thin mt-1">
              {Math.round(weather.main.temp)}°
            </p>
            <p className="text-lg mt-1 opacity-90">
              {getWeatherDesc(weather.weather[0].id)}
            </p>
          </div>

          {/* 상세 날씨 정보 */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <StatCard
              icon={<Thermometer size={16} />}
              label="체감온도"
              value={`${Math.round(weather.main.feels_like)}°C`}
            />
            <StatCard
              icon={<Droplets size={16} />}
              label="습도"
              value={`${weather.main.humidity}%`}
            />
            <StatCard
              icon={<Wind size={16} />}
              label="풍속"
              value={`${weather.wind.speed}m/s`}
            />
            <StatCard
              icon={<Thermometer size={16} />}
              label="최고/최저"
              value={`${Math.round(weather.main.temp_max)}° / ${Math.round(weather.main.temp_min)}°`}
            />
          </div>

          {/* 도시 검색 */}
          <SearchBar onSearch={onSearch} placeholder="지역 검색 (예: 강남구, 해운대구)..." />
        </div>
      )}
    </div>
  );
}

// 날씨 통계 카드 (내부용)
function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
      <div className="flex items-center gap-1 text-white/70 text-xs mb-1">
        {icon}
        <span>{label}</span>
      </div>
      <p className="text-white font-semibold text-sm">{value}</p>
    </div>
  );
}
