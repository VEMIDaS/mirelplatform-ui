import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { LoginCredentials } from '../types/auth';
import { authClient } from '../api/authClient';

export const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(true);

  const handleLogout = useCallback(async () => {
    await authClient.logout();
    setUser(null);
    // ログアウト時は常にログイン画面へ
    navigate('/login', { replace: true });
  }, [navigate, setUser]);

  const handleLogin = useCallback(async (credentials: LoginCredentials) => {
    try {
      const userData = await authClient.login(credentials);
      setUser(userData);
      // 遷移元のURLがあればそこに戻る
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (error) {
      throw new Error('ログインに失敗しました');
    }
  }, [navigate, location, setUser]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isValid = await authClient.checkSession();
        if (!isValid && user) {
          await handleLogout();
        }
      } finally {
        setLoading(false);
      }
    };

    const interval = setInterval(checkAuth, 15 * 60 * 1000);
    checkAuth();

    return () => clearInterval(interval);
  }, [user, handleLogout]);

  return {
    user,
    loading,
    login: handleLogin,
    logout: handleLogout,
  };
};