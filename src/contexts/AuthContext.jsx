import { createContext, useContext, useState } from 'react';

// 계정 정보 (실제 서비스라면 서버에서 검증해야 함)
const USERS = {
  admin: { password: 'admin1234', role: 'admin', name: '관리자' },
  user:  { password: 'user1234',  role: 'user',  name: '일반사용자' },
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = (username, password) => {
    const found = USERS[username];
    if (!found || found.password !== password) return false;
    const userData = { username, role: found.role, name: found.name };
    setUser(userData);
    localStorage.setItem('auth_user', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
