import React, { useContext, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import styles from '../styles/Login.module.css';
import { AuthContext, useAuth } from "../context/AuthContext";

function LoginPage() {
    const { login } = useAuth();

    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitted(true);
        try {
            console.log("Submitting login form...");
            await login(userName, password);
            console.log("Logged in successfully!");
            history.push("/profile");
        } catch (error) {
            console.log(error.message);
        }
    }
    return (

        <>

            <form onSubmit={handleSubmit} className={styles["layout"]}>

                <label htmlFor="login-username" className={styles["label"]}>
                    Username:
                    <input
                        className={styles["label"]}
                        type="text"
                        id="login-username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={userName}
                        placeholder="Fill in your username"
                    />
                    {isSubmitted && userName.length < 6 && <p className={styles["error"]}>Your username isn't long enough</p>}
                    {isSubmitted &&userName.length >= 6 && <p className={styles["good"]}>Your username is long enough</p>}
                </label>


                <label htmlFor="login-password" className={styles["label"]}>
                    Password:
                    <input
                        className={styles["label"]}
                        type="password"
                        id="login-password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Fill in your password"
                    />
                    {isSubmitted &&password.length < 6 && <p className={styles["error"]}>Your password isn't long enough</p>}
                    {isSubmitted &&password.length >= 6 && <p className={styles["good"]}>Your password is long enough</p>}
                </label>
                <button type='submit' className={styles['button']}>
                    Login
                </button>
            </form>

            <p className={styles['logintekst']}>
                Als u nog geen account heeft kunt u er{' '}
                <Link to='/signup' className={styles['loginlink']}>
                    hier{' '}
                </Link>
                een aanmaken.
            </p>
        </>
    );
}

export default LoginPage;