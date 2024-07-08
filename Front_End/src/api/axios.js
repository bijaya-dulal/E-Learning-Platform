import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',  // Adjust based on your Django server
});

// // Add a request interceptor to include token if available
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default axiosInstance;
