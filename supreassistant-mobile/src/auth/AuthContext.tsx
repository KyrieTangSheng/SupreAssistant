import React, { createContext, useState, useContext, useEffect } from 'react';
import { storage } from '../utils/storage';

type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on app launch
    const loadToken = async () => {
      const storedToken = await storage.getToken();
      if (storedToken) {
        setToken(storedToken);
      }
      setIsLoading(false);
    };
    loadToken();
  }, []);

  const login = async (newToken: string) => {
    await storage.setToken(newToken);
    setToken(newToken);
  };

  const logout = async () => {
    await storage.removeToken();
    setToken(null);
  };

  return (
    <AuthContext.Provider 
      value={{
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (undefined === context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};