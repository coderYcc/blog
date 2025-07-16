// hooks/useAuth.js
import { useState, useEffect } from 'react';
import { isTokenExpired } from '../utils/pwt';

export const useAuth = () => {
  const [authState, setAuthState] = useState(() => {
    const info = localStorage.getItem('userInfo');
    if (info) {
      try {
        const parsed = JSON.parse(info);
        const token = parsed.token;
        if (token && isTokenExpired(token)) {
          localStorage.removeItem('userInfo');
          return { userInfo: null, token: null };
        }
        return parsed;
      } catch (e) {
        console.error('Failed to parse userInfo', e);
        localStorage.removeItem('userInfo');
        return { userInfo: null, token: null };
      }
    }
    return { userInfo: null, token: null };
  });

  const login = (data) => {
    localStorage.setItem('userInfo', JSON.stringify(data));
    setAuthState(data);
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setAuthState({ userInfo: null, token: null });
  };

  // 监听 storage 变化，跨标签页同步登录状态
  useEffect(() => {
    const handleStorageChange = () => {
      const info = localStorage.getItem('userInfo');
      if (info) {
        try {
          const parsed = JSON.parse(info);
          const token = parsed.token;
          if (token && isTokenExpired(token)) {
            localStorage.removeItem('userInfo');
            setAuthState({ userInfo: null, token: null });
          } else {
            setAuthState(parsed);
          }
        } catch (e) {
          console.error('Failed to parse userInfo', e);
        }
      } else {
        setAuthState({ userInfo: null, token: null });
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return {
    ...authState,
    login,
    logout,
    isAuthenticated: !!authState.token && !isTokenExpired(authState.token),
  };
};