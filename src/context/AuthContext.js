import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const AuthContext = createContext({});

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoginSubmitted, setIsLoginSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();
    const API_BASE_URL = 'https://frontend-educational-backend.herokuapp.com';

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${API_BASE_URL}/api/user`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setUser(data);
                setIsAuthenticated(true);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            fetchData();
        } else {
            setIsLoading(false);
        }
    }, []);

    const login = async (username, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const { accessToken, user } = await response.json();
            localStorage.setItem('accessToken', accessToken);
            setUser(user);
            setIsAuthenticated(true);
            setIsLoginSubmitted(true);
            history.push('/profile');
        } catch (error) {
            console.error(error);
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        setUser(null);
        setIsAuthenticated(false);
        history.push('/');
    };

    const contextData = {
        user,
        isAuthenticated,
        login,
        logout,
        isLoginSubmitted,
        setIsAuthenticated,
    };

    return (
        <>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <AuthContext.Provider value={contextData}>
                    {children}
                </AuthContext.Provider>
            )}
        </>
    );
}