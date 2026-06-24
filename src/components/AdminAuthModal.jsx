import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function AdminAuthModal({ onClose }) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const reset = () => { setUsername(''); setPassword(''); setConfirm(''); setError(''); };

  const switchMode = (m) => { setMode(m); reset(); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password) { setError('아이디와 비밀번호를 입력해주세요.'); return; }
    if (mode === 'register' && password !== confirm) { setError('비밀번호가 일치하지 않습니다.'); return; }

    setLoading(true);
    try {
      if (mode === 'register') await register(username, password);
      else await login(username, password);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full px-4 py-2.5 rounded-xl border text-sm
    border-gray-300 dark:border-gray-600
    bg-white dark:bg-gray-700
    text-gray-900 dark:text-white placeholder-gray-400
    focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 mx-4">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            🔑 관리자 {mode === 'login' ? '로그인' : '가입'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* 탭 */}
        <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 mb-5">
          {['login', 'register'].map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className={`flex-1 py-2 text-sm font-medium transition-colors cursor-pointer
                ${mode === m
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
            >
              {m === 'login' ? '로그인' : '회원가입'}
            </button>
          ))}
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            value={username}
            onChange={(e) => { setUsername(e.target.value); setError(''); }}
            placeholder="아이디"
            className={inputClass}
            autoFocus
          />
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(''); }}
            placeholder="비밀번호"
            className={inputClass}
          />
          {mode === 'register' && (
            <input
              type="password"
              value={confirm}
              onChange={(e) => { setConfirm(e.target.value); setError(''); }}
              placeholder="비밀번호 확인"
              className={inputClass}
            />
          )}

          {error && <p className="text-red-500 text-xs text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700
              disabled:opacity-50 text-white font-semibold text-sm
              transition-colors cursor-pointer mt-1"
          >
            {loading ? '처리 중...' : mode === 'login' ? '로그인' : '가입하기'}
          </button>
        </form>
      </div>
    </div>
  );
}
