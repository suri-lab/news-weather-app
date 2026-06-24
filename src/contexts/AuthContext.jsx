import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    try {
      const saved = localStorage.getItem('admin_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const register = async (username, password) => {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'register', username, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    // 가입 후 자동 로그인
    const session = { username: data.username };
    setAdmin(session);
    localStorage.setItem('admin_session', JSON.stringify(session));
  };

  const login = async (username, password) => {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login', username, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    const session = { username: data.username };
    setAdmin(session);
    localStorage.setItem('admin_session', JSON.stringify(session));
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('admin_session');
  };

  return (
    <AuthContext.Provider value={{ admin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
