import axios from 'axios';

const authAxios = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

authAxios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const publicAxios = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

export { authAxios, publicAxios };
