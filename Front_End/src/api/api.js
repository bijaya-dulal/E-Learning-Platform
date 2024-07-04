import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

export const register = (username, email, password) => {
  return axios.post(`${API_URL}register/`, {
    username,
    email,
    password
  });
};

export const login = (email, password) => {
  return axios.post(`${API_URL}login/`, {
    username: email,
    password
  });
};

export const logout = (token) => {
  return axios.post(`${API_URL}logout/`, {}, {
    headers: {
      Authorization: `Token ${token}`
    }
  });
};
