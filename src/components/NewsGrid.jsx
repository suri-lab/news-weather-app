import NewsCard from './NewsCard';

// 뉴스 카테고리 목록
const CATEGORIES = ['전체', '기술', '경제', '사회'];

// 뉴스 그리드 컴포넌트
export default function NewsGrid({ news, loading, error, category, onCategoryChange }) {
  return (
    <div className="flex flex-col h-full">
      {/* 헤더: 제목 + 카테고리 탭 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          📰 주요 뉴스
        </h2>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-all
                ${category === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-blue-900'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 로딩 상태 */}
      {loading && (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 py-20">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-gray-500 dark:text-gray-400">데이터를 불러오는 중...</p>
        </div>
      )}

      {/* 에러 상태 */}
      {!loading && error && (
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-5xl mb-4">😞</p>
            <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
              뉴스를 불러올 수 없습니다
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* 뉴스 없음 */}
      {!loading && !error && news.length === 0 && (
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-5xl mb-4">📭</p>
            <p className="text-gray-500 dark:text-gray-400">데이터를 찾을 수 없습니다</p>
          </div>
        </div>
      )}

      {/* 뉴스 카드 그리드 */}
      {!loading && !error && news.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {news.map((article, idx) => (
            <NewsCard key={`${article.url}-${idx}`} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
