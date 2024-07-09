import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',  // Adjust based on your Django server
  xsrfCookieName:'csrfToken',
  xsrfHeaderName:'X-CSRFToken',
  withCredentials: true, // Include credentials (cookies)
});

axiosInstance.interceptors.request.use(config => {
  const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  if (token) {
    config.headers['X-CSRFToken'] = token;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default axiosInstance;
