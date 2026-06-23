import { Sun, Moon } from 'lucide-react';

// 다크모드 토글 버튼 컴포넌트
export default function DarkModeToggle({ isDark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      className="p-2 rounded-full cursor-pointer
        bg-gray-200 dark:bg-gray-700
        text-gray-700 dark:text-yellow-300
        hover:bg-gray-300 dark:hover:bg-gray-600
        transition-all duration-300"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
