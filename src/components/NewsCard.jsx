import { ExternalLink, Clock, Newspaper } from 'lucide-react';

// 뉴스 카드 컴포넌트
export default function NewsCard({ article }) {
  const { title, description, source, publishedAt, urlToImage, url } = article;

  // 발행 시간 포맷 (몇 분/시간/일 전)
  const formatTime = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes}분 전`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}시간 전`;
    return `${Math.floor(hours / 24)}일 전`;
  };

  const handleClick = () => {
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group rounded-xl overflow-hidden shadow-md cursor-pointer
        bg-white dark:bg-gray-800
        border border-gray-100 dark:border-gray-700
        hover:shadow-xl hover:-translate-y-1
        transition-all duration-300"
    >
      {/* 썸네일 이미지 */}
      <div className="relative h-40 bg-gray-200 dark:bg-gray-700 overflow-hidden">
        {urlToImage ? (
          <img
            src={urlToImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
            <Newspaper size={40} />
          </div>
        )}
        {/* 언론사 배지 */}
        <span className="absolute top-2 left-2 px-2 py-1 rounded-md text-xs font-medium
          bg-black/50 text-white backdrop-blur-sm">
          {source?.name || '알 수 없음'}
        </span>
      </div>

      {/* 카드 내용 */}
      <div className="p-4">
        <h3 className="font-semibold text-sm leading-snug mb-2 line-clamp-2
          text-gray-900 dark:text-gray-100
          group-hover:text-blue-600 dark:group-hover:text-blue-400
          transition-colors">
          {title}
        </h3>

        {description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
            {description}
          </p>
        )}

        {/* 하단 정보 */}
        <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{formatTime(publishedAt)}</span>
          </div>
          <div className="flex items-center gap-1 text-blue-500 dark:text-blue-400">
            <ExternalLink size={12} />
            <span>원문 보기</span>
          </div>
        </div>
      </div>
    </div>
  );
}
