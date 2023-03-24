import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styles from "../styles/AuthContext.module.css"

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
    const location = useLocation();
    const API_BASE_URL = 'https://frontend-educational-backend.herokuapp.com';

    useEffect(() => {
        async function fetchData() {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (accessToken && !isAuthenticated) {
                    const response = await fetch(`${API_BASE_URL}/api/user`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${accessToken}`,
                        },
                    });
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setUser(data);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        const accessToken = localStorage.getItem('accessToken');
        if (accessToken && !isAuthenticated) {
            fetchData();
        } else {
            setIsLoading(false);
        }
    }, [isAuthenticated]);

    const login = async (username, password) => {
        try {
            console.log('Raakt de login');
            const response = await fetch(`${API_BASE_URL}/api/auth/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const error = new Error(`HTTP error! status: ${response.status}`);
                error.response = response;
                throw error;
            }

            const { accessToken, user } = await response.json();
            localStorage.setItem('accessToken', accessToken);
            setUser(user);
            setIsAuthenticated(true);
            setIsLoginSubmitted(true);
            console.log('Raakt de authentication' + isAuthenticated);
            history.push('/Profile');
            contextData.isAuthenticated = true;

            const userResponse = await fetch(`${API_BASE_URL}/api/user`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
            });
            if (!userResponse.ok) {
                throw new Error(`HTTP error! status: ${userResponse.status}`);
            }
            const userData = await userResponse.json();
            setUser(userData);

        } catch (error) {
            console.error(error);
            throw error;
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
        userDetail: user && {
            name: user.name,
            email: user.email,
        },
    };

    console.log('Raakt authcontext onderin ' + contextData.user?.username);
    console.log('Raakt authcontext onderin ' + contextData.user?.email);

    return (
        <div className={styles["layout"]}>
            {isAuthenticated ? (
                <>
                    {location.pathname === "/Profile" && (
                        <>
                            <h3>Dit is je profiel</h3>
                            <p>Dit kun je alleen zien als je bent ingelogd</p>
                            <br />
                            <p>Logged in as user: {user ? user.username : "None"}</p>
                            <p>Logged in user with email: {user ? user.email : "None"}</p>
                            <p>Logged in user with role: {user ? user.role : "None"}</p>
                            <p>Is authenticated: {isAuthenticated.toString()}</p>
                            <button onClick={logout} className={styles["logoutbutton"]}>
                                Logout
                            </button>
                        </>
                    )}
                </>
            ) : (
                <>
                    {location.pathname === "/Profile" && (
                        <>
                            <p>You are not logged in.</p>
                            <button
                                onClick={() => history.push("/login")}
                                className={styles["loginbutton"]}
                            >
                                Log in
                            </button>
                        </>
                    )}
                </>
            )}
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <AuthContext.Provider value={contextData}>
                    {children}
                </AuthContext.Provider>
            )}
        </div>
    );
}