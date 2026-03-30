import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../lib/api';

interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  language?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => void;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: { name: string; email: string; password: string }) => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await api.get('/auth/me');
      setUser(res.data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
      setUser(null);
      window.location.href = '/';
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  const login = async (data: { email: string; password: string }) => {
    const res = await api.post('/auth/login', data);
    setUser(res.data.user);
  };

  const register = async (data: { name: string; email: string; password: string }) => {
    const res = await api.post('/auth/register', data);
    setUser(res.data.user);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, login, register, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
