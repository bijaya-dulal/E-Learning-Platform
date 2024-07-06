// src/api/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Function to register a new user
export const register = (username, email, password) => {
  return api.post('register/', {
    username,
    email,
    password
  });
};

// Function to log in a user
export const login = (email, password) => {
  return api.post('auth/token/', {
    username: email, // Assuming username is used for authentication
    password
  });
};

// Function to log out a user
export const logout = () => {
  const token = localStorage.getItem('token');
  if (!token) return Promise.reject(new Error('No token found'));

  return api.post('logout/', {}, {
    headers: {
      Authorization: `Token ${token}`
    }
  }).then(response => {
    localStorage.removeItem('token');
    return response;
  });
};

// Function to set auth token in headers for future requests
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Token ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;
