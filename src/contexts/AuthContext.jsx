// src/contexts/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from "react";
import { apiClient } from "../services/apiClient";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already logged in (token exists)
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      
      try {
        // Validate token with backend
        const response = await apiClient.get('/auth/me');
        setCurrentUser(response.data);
        setUserRole(response.data.role);
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Auth token validation failed:', err);
        // If token is invalid, clear it
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      // Store token
      localStorage.setItem('token', token);
      
      // Update state
      setCurrentUser(user);
      setUserRole(user.role);
      setIsAuthenticated(true);
      
      return user;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const signup = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.post('/auth/register', { 
        email, 
        password,
        role: "owner" // Default role
      });
      
      const { token, user } = response.data;
      
      // Store token
      localStorage.setItem('token', token);
      
      // Update state
      setCurrentUser(user);
      setUserRole(user.role);
      setIsAuthenticated(true);
      
      return user;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Call backend to invalidate token if needed
      await apiClient.post('/auth/logout');
    } catch (err) {
      console.error('Logout API error:', err);
    } finally {
      // Clear local storage and state
      localStorage.removeItem('token');
      setCurrentUser(null);
      setUserRole(null);
      setIsAuthenticated(false);
    }
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      const response = await apiClient.put('/auth/profile', userData);
      setCurrentUser(prev => ({ ...prev, ...response.data }));
      return response.data;
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    userRole,
    loading,
    error,
    isAuthenticated,
    login,
    signup,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}