import axios from 'axios';
import { getCsrfToken } from '../utils/csrf';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',  // Adjust based on your Django server
  xsrfCookieName: 'csrftoken',           // Specify the name of the CSRF cookie
  xsrfHeaderName: 'X-CSRFToken',         // Specify the header name to use for CSRF token
  withCredentials: true,                 // Include credentials (cookies)
});

axiosInstance.interceptors.request.use(config => {
  const token = getCsrfToken();  // Retrieve CSRF token from cookies using utility function

  if (token) {
    config.headers['X-CSRFToken'] = token;  // Set CSRF token in request headers
  }

  return config;
}, error => {
  return Promise.reject(error);
});

export default axiosInstance;
