import React, { createContext, useContext, useState } from 'react';
const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
};
const getCookie = (name) => {
    const value = document.cookie.split('; ').find(row => row.startsWith(name))?.split('=')[1];
    return value ? decodeURIComponent(value) : null;
};
const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const userCookie = getCookie('user');
        return userCookie ? JSON.parse(userCookie) : null;
    });
    const signIn = (userData) => {
        setCookie('user', JSON.stringify(userData), 7); // Cookie expires in 7 days
        setUser(userData);
    };
    const signOut = () => {
        deleteCookie('user');
        setUser(null);
    };
    return (React.createElement(AuthContext.Provider, { value: { user, signIn, signOut } }, children));
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
