import { Droplets, Wind, Thermometer, MapPin } from 'lucide-react';
import SearchBar from './SearchBar';

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
            <p className="text-lg capitalize mt-1 opacity-90">
              {weather.weather[0].description}
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
          <SearchBar onSearch={onSearch} placeholder="도시명 검색 (영문)..." />
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
