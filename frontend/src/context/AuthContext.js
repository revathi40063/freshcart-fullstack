import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';


const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session in localStorage
    const savedUser = localStorage.getItem('freshcart_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  /*const login = async (email, password) => {
    try {
      // Simulate API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        localStorage.setItem('freshcart_user', JSON.stringify(userData));
        return { success: true };
      } else {
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      // For demo purposes, simulate successful login
      const demoUser = {
        id: 1,
        name: 'Demo User',
        email: email,
        avatar: 'https://via.placeholder.com/150'
      };
      setUser(demoUser);
      localStorage.setItem('freshcart_user', JSON.stringify(demoUser));
      return { success: true };
    }
  };

  const register = async (name, email, password) => {
    try {
      // Simulate API call
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        localStorage.setItem('freshcart_user', JSON.stringify(userData));
        return { success: true };
      } else {
        return { success: false, error: 'Email already exists' };
      }
    } catch (error) {
      // For demo purposes, simulate successful register
      const demoUser = {
        id: 1,
        name: name,
        email: email,
        avatar: 'https://via.placeholder.com/150'
      };
      setUser(demoUser);
      localStorage.setItem('freshcart_user', JSON.stringify(demoUser));
      return { success: true };
    }
  };*/
  const register = async (name, email, password) => {
    try {
      const result = await authAPI.register(name, email, password); // <-- real API
      if (result.success) {
        setUser(result.user);
        localStorage.setItem('freshcart_user', JSON.stringify(result.user));
      }
      return result;
    } catch (error) {
      console.error('Registration error:', error.response?.data || error);
      return { success: false, message: error.response?.data?.message || 'Server error' };
    }
  };
  
  const login = async (email, password) => {
    try {
      const result = await authAPI.login(email, password); // <-- real API
      if (result.success) {
        setUser(result.user);
        localStorage.setItem('freshcart_user', JSON.stringify(result.user));
      }
      return result;
    } catch (error) {
      console.error('Login error:', error.response?.data || error);
      return { success: false, message: error.response?.data?.message || 'Server error' };
    }
  };
  

  const logout = () => {
    setUser(null);
    localStorage.removeItem('freshcart_user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
