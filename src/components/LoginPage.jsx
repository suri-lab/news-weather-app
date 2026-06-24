import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = login(username.trim(), password);
    if (!ok) setError('아이디 또는 비밀번호가 올바르지 않습니다.');
  };

  const inputClass = `w-full px-4 py-3 rounded-xl border text-sm
    border-gray-300 dark:border-gray-600
    bg-white dark:bg-gray-700
    text-gray-900 dark:text-white
    placeholder-gray-400
    focus:outline-none focus:ring-2 focus:ring-blue-500
    transition-all`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">

        <div className="text-center mb-8">
          <span className="text-4xl">🌐</span>
          <h1 className="mt-3 text-2xl font-bold text-gray-900 dark:text-white">한국 뉴스 & 날씨</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">로그인하여 서비스를 이용하세요</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">아이디</label>
            <input
              type="text"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(''); }}
              placeholder="아이디 입력"
              className={inputClass}
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="비밀번호 입력"
              className={inputClass}
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700
              text-white font-semibold text-sm
              transition-colors cursor-pointer mt-2"
          >
            로그인
          </button>
        </form>

        {/* 데모 계정 안내 */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl text-xs text-gray-500 dark:text-gray-400">
          <p className="font-semibold mb-2 text-gray-600 dark:text-gray-300">데모 계정</p>
          <div className="flex flex-col gap-1">
            <p>👤 일반사용자: <span className="font-mono">user</span> / <span className="font-mono">user1234</span></p>
            <p>🔑 관리자: <span className="font-mono">admin</span> / <span className="font-mono">admin1234</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
