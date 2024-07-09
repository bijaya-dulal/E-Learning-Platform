// src/api/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Function to register a new user  and login
export const login = (email, password) => {
  return api.post('login/', { username:username, password: password });
};

export const register = (email, password, username) => {
  return api.post('register/', { email: email, password: password, username: username });
};
 
export const getUser = async () => {
  try {
    const response = await api.get('/api/user/');
    return response.data; // Assuming your API returns user data as JSON
  } catch (error) {
    throw error; // Handle errors in your component
  }
};

//
// api.interceptors.request.use(config => {
//   const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
//   if (token) {
//     config.headers['X-CSRFToken'] = token;
//   }
//   return config;
// });

export default api;
