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

export default api;
