import React, { ReactNode } from 'react';
interface AuthContextType {
    user: any;
    signIn: (userData: any) => void;
    signOut: () => void;
}
export declare const AuthProvider: React.FC<{
    children: ReactNode;
}>;
export declare const useAuth: () => AuthContextType;
export {};
