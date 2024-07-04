import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',  // Adjust based on your Django server
});

export default axiosInstance;
