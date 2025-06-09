
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'Admin' | 'Developer' | 'Viewer';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('zdb_token');
    const storedUser = localStorage.getItem('zdb_user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Mock API call - replace with actual API endpoint
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('zdb_token', data.token);
      localStorage.setItem('zdb_user', JSON.stringify(data.user));
      
      toast({
        title: `Welcome back, ${data.user.name}! 👋`,
        description: "You've been successfully logged in.",
      });
    } catch (error) {
      // For demo purposes, create a mock user
      const mockUser = {
        id: '1',
        name: email.split('@')[0],
        email,
        role: 'Admin' as const,
      };
      const mockToken = 'mock-jwt-token';
      
      setUser(mockUser);
      setToken(mockToken);
      localStorage.setItem('zdb_token', mockToken);
      localStorage.setItem('zdb_user', JSON.stringify(mockUser));
      
      toast({
        title: `Welcome back, ${mockUser.name}! 👋`,
        description: "You've been successfully logged in (demo mode).",
      });
    }
  };

  const register = async (name: string, email: string, password: string, role: string) => {
    try {
      // Mock API call - replace with actual API endpoint
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('zdb_token', data.token);
      localStorage.setItem('zdb_user', JSON.stringify(data.user));
      
      toast({
        title: "Account created successfully! 🎉",
        description: "Welcome to ZDB!",
      });
    } catch (error) {
      // For demo purposes, create a mock user
      const mockUser = {
        id: '1',
        name,
        email,
        role: role as 'Admin' | 'Developer' | 'Viewer',
      };
      const mockToken = 'mock-jwt-token';
      
      setUser(mockUser);
      setToken(mockToken);
      localStorage.setItem('zdb_token', mockToken);
      localStorage.setItem('zdb_user', JSON.stringify(mockUser));
      
      toast({
        title: "Account created successfully! 🎉",
        description: "Welcome to ZDB (demo mode)!",
      });
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('zdb_token');
    localStorage.removeItem('zdb_user');
    
    toast({
      title: "Logged out successfully",
      description: "See you next time!",
    });
  };

  const hasRole = (role: string) => {
    if (!user) return false;
    
    const roleHierarchy = {
      'Admin': ['Admin', 'Developer', 'Viewer'],
      'Developer': ['Developer', 'Viewer'],
      'Viewer': ['Viewer'],
    };
    
    return roleHierarchy[user.role]?.includes(role) || false;
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!user && !!token,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
