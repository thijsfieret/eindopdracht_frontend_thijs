import React, {useState} from 'react';
import styles from "../styles/Signup.module.css"
import axios from "axios";
import {useHistory} from "react-router-dom";

function Signup() {
    const [email, setEmail] = useState('');
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setRole] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const history = useHistory()

    async function SignUpUser(e) {
        e.preventDefault()
        setIsSubmitted(true);

        try {
            const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup',
                {
                    "username": userName,
                    "email": email,
                    "password": password,
                    "role": [user]
                });

            if (response.status === 200) {
                setSuccessMessage('Account created successfully! Sending you to the login page!');
                setEmail('');
                setUsername('');
                setPassword('');
                setRole('');
                setIsSubmitted(false);
                setErrorMessage('');
                setTimeout(() => {
                    setSuccessMessage('Account created successfully!');
                    history.push('/login');
                }, 2000);
            }
        } catch (e) {
            console.error(e);
            setSuccessMessage('');
            setErrorMessage('Error creating account. Please try again later.');
        }
    }

    return (

        <>
            <div/>
            <form onSubmit={SignUpUser} className={styles["layout"]}>
                {successMessage && <p className={styles["success"]}>{successMessage}</p>}
                {errorMessage && <p className={styles["error"]}>{errorMessage}</p>}
                <label htmlFor="email">
                    Email:
                    <br></br>
                    <input
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Fill in your email"
                    />
                </label>
                <label htmlFor="username" className={styles["label"]}>
                    Username:
                    <br></br>
                    <input
                        type="text"
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={userName}
                        placeholder="Fill in your username"
                    />
                    {isSubmitted && userName.length < 6 && <p className={styles["error"]}>Your username isn't long enough</p>}
                </label>
                <label htmlFor="password" className={styles["label"]}>
                    Password:
                    <br></br>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Your password"
                    />
                    {isSubmitted && password.length < 6 && <p className={styles["error"]}>Your password isn't long enough</p>}
                </label>

                <label htmlFor="role" className={styles["label"]}>
                    Role:
                    <br></br>
                    <input
                        type="text"
                        id="role"
                        onChange={(e) => setRole(e.target.value)}
                        value={user}
                        placeholder="user or admin"
                    />
                </label>
                <br></br>
                <button type="submit" className={styles["button"]}>Register</button>
            </form>


        </>

    );
}

export default Signup;