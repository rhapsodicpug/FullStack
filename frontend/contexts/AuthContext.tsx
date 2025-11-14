'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, authAPI, SignupData, LoginData } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (data: SignupData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const { user } = await authAPI.getMe();
        setUser(user);
      }
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const signup = async (data: SignupData) => {
    const response = await authAPI.signup(data);
    localStorage.setItem('token', response.token);
    setUser(response.user);
    toast.success('Welcome back!', {
      description: `Welcome, ${response.user.name}!`,
    });
    router.push('/dashboard');
  };

  const login = async (data: LoginData) => {
    const response = await authAPI.login(data);
    localStorage.setItem('token', response.token);
    setUser(response.user);
    toast.success('Welcome back!', {
      description: `Welcome, ${response.user.name}!`,
    });
    router.push('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signup,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

