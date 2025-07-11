import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const info = localStorage.getItem('userInfo')
    if(info) {
      const data = JSON.parse(info);
      setUserInfo(data);
      setLoading(false);
    }
  }, []);

  const login = (data) => {
    localStorage.setItem('userInfo', JSON.stringify(data));
    setUserInfo(data);
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
  };

  return { userInfo, loading, login, logout };
};  