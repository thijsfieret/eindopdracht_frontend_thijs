import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

function Profile() {
    const { isAuthenticated } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const API_BASE_URL = 'https://frontend-educational-backend.herokuapp.com';

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/user', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
                });
                console.log('Response status:', response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('User data:', data);
                setUser(data);
            } catch (error) {
                console.error('Error:', error);
                console.log('localStorage.accessToken:', localStorage.getItem('accessToken'));
            } finally {
                setLoading(false);
            }
        }

        if (isAuthenticated) {
            fetchData();
        } else {
            history.push('/login');
        }
    }, [isAuthenticated, history]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Unable to fetch user data</div>;
    }

    return (
        <>
            <header></header>
            <main>
                <h3>Welcome to your personal profile page</h3>
                <section>
                    <h6>Your personal data</h6>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                </section>
                <section>
                    <h6>Personal profile content</h6>
                    <p>Your personal and private information</p>
                </section>
                <section>
                    <h6>Account details</h6>
                    <p>Account created on: {new Date(user.createdAt).toLocaleDateString()}</p>
                    <p>Last login: {new Date(user.lastLogin).toLocaleString()}</p>
                </section>
            </main>
        </>
    );
}

export default Profile;