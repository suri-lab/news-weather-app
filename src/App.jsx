import { useState, useEffect } from 'react';
import WeatherWidget from './components/WeatherWidget';
import NewsGrid from './components/NewsGrid';
import DarkModeToggle from './components/DarkModeToggle';
import { useWeather } from './hooks/useWeather';
import { useNews } from './hooks/useNews';

export default function App() {
  // 시스템 다크모드 설정을 기본값으로 사용
  const [isDark, setIsDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  const { weather, loading: weatherLoading, error: weatherError, searchCity } = useWeather('Busan');
  const { news, loading: newsLoading, error: newsError, category, changeCategory } = useNews('전체');

  // 다크모드 클래스 적용
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 backdrop-blur-md
        bg-white/80 dark:bg-gray-900/80
        border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌐</span>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              한국 뉴스 & 날씨
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 dark:text-gray-500 hidden sm:block">
              {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
            </span>
            <DarkModeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* 왼쪽: 날씨 위젯 (30%) */}
          <aside className="w-full lg:w-[30%] lg:min-w-[280px] lg:max-w-[360px]">
            <div className="lg:sticky lg:top-20">
              <WeatherWidget
                weather={weather}
                loading={weatherLoading}
                error={weatherError}
                onSearch={searchCity}
              />
            </div>
          </aside>

          {/* 오른쪽: 뉴스 그리드 (70%) */}
          <section className="flex-1 min-w-0">
            <NewsGrid
              news={news}
              loading={newsLoading}
              error={newsError}
              category={category}
              onCategoryChange={changeCategory}
            />
          </section>

        </div>
      </main>

      {/* 푸터 */}
      <footer className="mt-10 py-6 text-center text-xs text-gray-400 dark:text-gray-600
        border-t border-gray-200 dark:border-gray-800">
        <p>데이터 제공: OpenWeatherMap · NewsAPI</p>
        <p className="mt-1">© 2025 한국 뉴스 & 날씨 대시보드</p>
      </footer>
    </div>
  );
}
