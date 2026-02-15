import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { User, UserRole } from '../types';
import { MOCK_USERS } from '../data/mock';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, role?: string) => Promise<void>;
    register: (name: string, email: string, role: UserRole) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('serbisure_user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [isLoading, setIsLoading] = useState(false);

    const login = useCallback(async (email: string, role?: string) => {
        setIsLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Find user by email
        let foundUser = MOCK_USERS.find(u => u.email === email);

        // If not found in mock but verified via env (role provided), create dynamic user
        if (!foundUser && role) {
            foundUser = {
                id: `env_${Date.now()}`,
                name: email.split('@')[0],
                email: email,
                role: role as UserRole,
                avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}`
            };
        }

        if (foundUser) {
            setUser(foundUser);
            localStorage.setItem('serbisure_user', JSON.stringify(foundUser));
        } else {
            alert('Invalid credentials. Please use one of the demo accounts.');
        }
        setIsLoading(false);
    }, []);

    const register = useCallback(async (name: string, email: string, role: UserRole) => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));

        const newUser: User = {
            id: `u${Date.now()}`,
            name,
            email,
            role,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`
        };

        setUser(newUser);
        localStorage.setItem('serbisure_user', JSON.stringify(newUser));
        setIsLoading(false);
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem('serbisure_user');
    }, []);

    const value = useMemo(() => ({
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user
    }), [user, isLoading, login, register, logout]);

    return (
        <AuthContext.Provider value={value}>
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
