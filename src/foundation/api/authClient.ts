import axios from 'axios';
import { appConfig } from '../config/appConfig';
import { LoginCredentials, AuthUser } from '../types/auth';

export const authClient = {
  async login(credentials: LoginCredentials): Promise<AuthUser> {
    if (!appConfig.auth.enabled) {
      // 認証無効時はダミーユーザーを返す
      return {
        username: 'guest',
        roles: ['user'],
        token: 'dummy-token'  
      };
    }

    const response = await axios.post(
      `${appConfig.api.target}/auth/login`,
      credentials
    );
    const token = response.data.token;
    
    // 以降のリクエストにトークンを付与
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    return response.data;
  },

  async logout(): Promise<void> {
    if (!appConfig.auth.enabled) {
      return;
    }
    axios.defaults.headers.common['Authorization'] = '';
    localStorage.removeItem('auth');
  },

  async checkSession(): Promise<boolean> {
    if (!appConfig.auth.enabled) {
      return true;
    }
    try {
      await axios.get(`${appConfig.api.target}/auth/check`);
      return true;
    } catch {
      return false;
    }
  }
};

// リクエストインターセプター
axios.interceptors.request.use(
  (config) => {
    console.log('Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data,
      headers: config.headers
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// レスポンスインターセプター
axios.interceptors.response.use(
  (response) => {
    console.log('Response:', {
      status: response.status,
      data: response.data,
      headers: response.headers
    });
    return response;
  },
  (error) => {
    console.error('Error:', {
      status: error.response?.status,
      data: error.response?.data,
      config: error.config
    });
    return Promise.reject(error);
  }
);