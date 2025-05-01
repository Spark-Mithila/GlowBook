// src/services/apiClient.js

import axios from 'axios';

// Create an axios instance with base URL and default headers
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token in each request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle authentication errors
    if (error.response?.status === 401) {
      // Logout user or redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    // Network errors
    if (!error.response) {
      console.error('Network Error. Please check your connection.');
    }
    
    return Promise.reject(error);
  }
);