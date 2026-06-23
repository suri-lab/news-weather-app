import { useState } from 'react';
import { Search } from 'lucide-react';

// 도시 검색 바 컴포넌트
export default function SearchBar({ onSearch, placeholder = '도시명 검색...' }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed) {
      onSearch(trimmed);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-3 py-2 rounded-lg text-sm
          bg-white/20 dark:bg-black/20
          text-white placeholder-white/60
          border border-white/30
          focus:outline-none focus:border-white/60
          transition-all"
      />
      <button
        type="submit"
        className="px-3 py-2 rounded-lg cursor-pointer
          bg-white/20 hover:bg-white/30
          text-white border border-white/30
          transition-all"
        aria-label="검색"
      >
        <Search size={16} />
      </button>
    </form>
  );
}
