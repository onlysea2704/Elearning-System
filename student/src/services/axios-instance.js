// axios-instance.js
import axios from 'axios';

// Tạo một instance riêng của Axios
const api = axios.create({
  baseURL: 'https://localhost:3000', // đổi thành API của bạn
});

// Dùng interceptor để thêm token vào mỗi request
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
