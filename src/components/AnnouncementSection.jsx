import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function AnnouncementSection() {
  const { admin } = useAuth();
  const [announcements, setAnnouncements] = useState([]);
  const [content, setContent] = useState('');
  const [posting, setPosting] = useState(false);
  // 이 기기에서 좋아요 누른 공지 ID 목록
  const [likedIds, setLikedIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('liked_ids') || '[]'); }
    catch { return []; }
  });

  useEffect(() => {
    fetch('/api/announcements')
      .then((r) => r.json())
      .then(setAnnouncements)
      .catch(() => {});
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setPosting(true);
    try {
      const res = await fetch('/api/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      const item = await res.json();
      setAnnouncements((prev) => [item, ...prev]);
      setContent('');
    } finally {
      setPosting(false);
    }
  };

  const handleDelete = async (id) => {
    await fetch(`/api/announcements?id=${id}`, { method: 'DELETE' });
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  const handleLike = async (id) => {
    if (likedIds.includes(id)) return; // 이미 좋아요
    const res = await fetch('/api/announcements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'like', id }),
    });
    const { likes } = await res.json();
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, likes } : a))
    );
    const updated = [...likedIds, id];
    setLikedIds(updated);
    localStorage.setItem('liked_ids', JSON.stringify(updated));
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleString('ko-KR', {
      month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
    });

  if (!admin && announcements.length === 0) return null;

  return (
    <div className="mb-6 rounded-2xl border border-blue-200 dark:border-blue-800
      bg-blue-50 dark:bg-blue-950 p-4">

      <h2 className="text-sm font-bold text-blue-700 dark:text-blue-300 mb-3">
        📢 공지사항
      </h2>

      {/* 관리자 작성 폼 */}
      {admin && (
        <form onSubmit={handlePost} className="flex gap-2 mb-4">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="공지사항을 입력하세요..."
            className="flex-1 px-3 py-2 rounded-lg text-sm
              border border-blue-300 dark:border-blue-700
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-white
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={posting || !content.trim()}
            className="px-4 py-2 rounded-lg text-sm font-medium
              bg-blue-600 hover:bg-blue-700 disabled:opacity-50
              text-white transition-colors cursor-pointer"
          >
            등록
          </button>
        </form>
      )}

      {/* 공지사항 목록 */}
      {announcements.length === 0 ? (
        <p className="text-sm text-blue-400 dark:text-blue-500">등록된 공지사항이 없습니다.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {announcements.map((a) => (
            <li key={a.id}
              className="flex items-start justify-between gap-3
                bg-white dark:bg-gray-800 rounded-xl px-4 py-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 dark:text-gray-200">{a.content}</p>
                <p className="text-xs text-gray-400 mt-1">{formatDate(a.createdAt)}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* 좋아요 버튼 */}
                <button
                  onClick={() => handleLike(a.id)}
                  disabled={likedIds.includes(a.id)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs
                    font-medium transition-colors cursor-pointer
                    ${likedIds.includes(a.id)
                      ? 'bg-pink-100 dark:bg-pink-900 text-pink-500 dark:text-pink-300 cursor-default'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-pink-50 hover:text-pink-500 dark:hover:bg-pink-900 dark:hover:text-pink-300'
                    }`}
                >
                  {likedIds.includes(a.id) ? '❤️' : '🤍'} {a.likes || 0}
                </button>

                {/* 관리자 삭제 버튼 */}
                {admin && (
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="text-red-400 hover:text-red-600 text-xs cursor-pointer"
                  >
                    삭제
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
