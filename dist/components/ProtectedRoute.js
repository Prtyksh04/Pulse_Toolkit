import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
const ProtectedRoute = () => {
    const { user } = useAuth();
    return user ? React.createElement(Outlet, null) : React.createElement(Navigate, { to: "/signin" });
};
export default ProtectedRoute;
