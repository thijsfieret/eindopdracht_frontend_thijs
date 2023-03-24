import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

function Profile() {
    const { isAuthenticated, userDetails } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const API_BASE_URL = 'https://frontend-educational-backend.herokuapp.com';
    const [user, setUser] = useState({ name: '', email: '' });
    useEffect(() => {
        async function fetchData() {
            console.log('Raakt de fetchdata bovenin');
            try {
                console.log('Raakt de fetchdata 1 onder');
                const response = await fetch(`${API_BASE_URL}/api/user`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
                    }
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
            if (userDetails) {
                setUser(userDetails);
                setLoading(false);
            } else {
                fetchData();
            }
            console.log('Raakt de isauthenticated');
        } else {
            history.push('/login');
            console.log('Raakt de else, login');
        }
    }, [isAuthenticated, history, userDetails]);

    if (loading) {
        console.log('Raakt de loading');
        return <div>Loading...</div>;
    }

    if (!user) {
        console.log('Raakt de unable to fetch user data');
        return <div>Unable to fetch user data</div>;
    }
    console.log('WERKT');
    return (

        <>
            <header></header>
            <main>
            </main>
        </>
    );
}

export default Profile;