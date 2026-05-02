import axios from 'axios';
import { Log } from '../middleware/logging';

import { AUTH_TOKEN } from '../config/auth';

const BASE_URL = '/evaluation-service';

const api = axios.create({
  baseURL: BASE_URL,
});

// attach token to every request
api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token') || AUTH_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  Log('frontend', 'error', 'api', `Request Error: ${error.message}`);
  return Promise.reject(error);
});

api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.status === 401) {
    // token might be expired, clear it
    localStorage.removeItem('token');
    Log('frontend', 'warn', 'auth', 'Unauthorized - Token cleared from storage');
  }
  Log('frontend', 'error', 'api', `API Error: ${error.message}`);
  return Promise.reject(error);
});

export const authenticate = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth`, credentials);
    localStorage.setItem('token', response.data.access_token);
    Log('frontend', 'info', 'auth', 'Authentication successful');
    return response.data;
  } catch (error) {
    Log('frontend', 'error', 'auth', 'Authentication failed');
    throw error;
  }
};

export const fetchNotifications = async (params) => {
  try {
    const response = await api.get('/notifications', { params });
    Log('frontend', 'info', 'api', 'Notifications fetched successfully');
    return response.data;
  } catch (error) {
    Log('frontend', 'error', 'api', 'Failed to fetch notifications');
    throw error;
  }
};

export default api;
