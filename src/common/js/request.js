import axios from 'axios';
import isMockEnabled from '@/config/mock';
import apiConfig from '@/config/apiConfig';

const defaultConfig = {
  baseURL: apiConfig.baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
};

const instance = axios.create(defaultConfig);

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if(isMockEnabled) {
      // 使用 Mock 数据
      config.url = config.url.replace('/api', '/mock-api');
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  }
);

const api = {
    get: (url, config) => instance.get(url, config),
    post: (url, data, config) => instance.post(url, data, config),
    put: (url, data, config) => instance.put(url, data, config),
    delete: (url, config) => instance.delete(url, config),
};
  
export default api;