import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext<any>(null);

function isTokenExpired(token: string): boolean {
    try {
        const payloadPart = token.split('.')[1];
        if (!payloadPart) return true;
        const payload = JSON.parse(atob(payloadPart.replace(/-/g, '+').replace(/_/g, '/')));
        if (!payload.exp) return false;
        // Refresh a minute early to avoid edge races
        return payload.exp * 1000 <= Date.now() + 60_000;
    } catch {
        return true;
    }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (token && storedUser && storedUser !== 'undefined') {
            if (isTokenExpired(token)) {
                logout();
            } else {
                try {
                    setUser(JSON.parse(storedUser));
                } catch (error) {
                    console.error('Failed to parse user from localStorage', error);
                    logout();
                }
            }
        }
        setLoading(false);
    }, []);

    const login = (userData: any, token: string) => {
        setUser(userData);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
