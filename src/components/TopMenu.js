import React from 'react';
import { NavLink } from "react-router-dom";
import styles from "../styles/TopMenu.module.css"

function TopMenu() {
    return (
        <nav>
            <div className="nav-container">

                <ul className={styles["topmenu"]}>
                    <li className={styles["links"]}>
                        <NavLink to="/" exact activeClassName="active-link">Home</NavLink>
                    </li>
                    <li className={styles["links"]}>
                        <NavLink to="/AlleOpsporingsberichten" exact activeClassName="active-link">Alle opsporingsberichten</NavLink>
                    </li>
                    <li className={styles["links"]}>
                        <NavLink to="/Politiebureaus" exact activeClassName="active-link">Politiebureaus</NavLink>
                    </li>
                    <li className={styles["links"]}>
                        <NavLink to="/Wijkagenten" exact activeClassName="active-link">Wijkagenten</NavLink>
                    </li>
                    <li className={styles["links"]}>
                        <NavLink to="/Vermistevolwassenen" exact activeClassName="active-link">Vermiste volwassenen</NavLink>
                    </li>
                    <li className={styles["links"]}>
                        <NavLink to="/Vermistekinderen" exact activeClassName="active-link">Vermiste kinderen</NavLink>
                    </li>
                    <li className={styles["links"]}>
                        <NavLink to="/signup" exact activeClassName="active-link">Signup</NavLink>
                    </li>
                    <li className={styles["links"]}>
                        <NavLink to="/login" exact activeClassName="active-link">Login</NavLink>
                    </li>
                    <li className={styles["links"]}>
                        <NavLink to="/Profile" exact activeClassName="active-link">Profiel</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default TopMenu;