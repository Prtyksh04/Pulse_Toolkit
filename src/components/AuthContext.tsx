import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
};

const getCookie = (name: string) => {
  const value = document.cookie.split('; ').find(row => row.startsWith(name))?.split('=')[1];
  return value ? decodeURIComponent(value) : null;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

interface AuthContextType {
  user: any;
  signIn: (userData: any) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(() => {
    const userCookie = getCookie('user');
    return userCookie ? JSON.parse(userCookie) : null;
  });

  const signIn = (userData: any) => {
    setCookie('user', JSON.stringify(userData), 7); // Cookie expires in 7 days
    setUser(userData);
  };

  const signOut = () => {
    deleteCookie('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
