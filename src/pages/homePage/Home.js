import React, { useState, useEffect } from "react";
import {NavLink} from "react-router-dom";
import gezocht from "../../assets/gezocht.jpg"
import vermistvolwassene from "../../assets/vermistvolwassene.jpg"
import vermistkind from "../../assets/vermistkind.jpg"
import wijkagent from "../../assets/wijkagent.jpg"
import politiebureau from "../../assets/politiebureau.jpg"
import slachtofferwijzer from "../../assets/slachtofferwijzer.jpg"
import politie from "../../assets/politie.jpg"
import zoekjemee from "../../assets/zoekjemee.jpg"
import slachtofferhulp from "../../assets/slachtofferhulp.jpg"
import burgernet from "../../assets/burgernet.jpg"
import styles from "./Home.module.css"
import HomeCard from "../../components/mainMenuOptions/HomeCard";

function Home() {
    return (
        <>
            <main className={styles["homepage-container"]}>
                <section>
                    <NavLink to="/AlleOpsporingsberichten">
                        <HomeCard
                            image={gezocht}
                            title={"Alle opsporingsberichten"}
                            />
                    </NavLink>
                </section>
                <section>
                    <NavLink to="/Politiebureaus">
                        <HomeCard
                            image={politiebureau}
                            title={"Politiebureaus"}
                        />
                    </NavLink>
                </section>
                <section>
                <NavLink to="/Wijkagenten">
                    <HomeCard
                        image={wijkagent}
                        title={"Bekijk de wijkagenten"}
                    />
                </NavLink>
                </section>
                <section>
                    <NavLink to="/Vermistevolwassenen">
                        <HomeCard
                            image={vermistvolwassene}
                            title={"Vermiste volwassenen"}
                        />
                    </NavLink>
                </section>
                <section>
                    <NavLink to="/Vermistekinderen">
                        <HomeCard
                            image={vermistkind}
                            title={"Vermiste kinderen"}
                        />
                    </NavLink>
                </section>
                <section>
                    <a href={"https://slachtofferwijzer.nl/slachtoffer/vermissingen/"}>
                        <HomeCard
                            image={slachtofferwijzer}
                            title={"SlachtofferWijzer.nl"}
                        />
                    </a>
                </section>
                <section>
                    <a href={"https://www.politie.nl/gezocht-en-vermist/vermiste-volwassenen"}>
                        <HomeCard
                            image={politie}
                            title={"Politie.nl"}
                        />
                    </a>
                </section>
                <section>
                    <a href={"https://zoekjemee.nl/vermiste-personen/"}>
                        <HomeCard
                            image={zoekjemee}
                            title={"Zoekjemee.nl"}
                        />
                    </a>
                </section>
                <section>
                    <a href={"https://www.slachtofferhulp.nl/gebeurtenissen/vermissing-persoon/"}>
                        <HomeCard
                            image={slachtofferhulp}
                            title={"Slachtofferhulp.nl"}
                        />
                    </a>
                </section>
                <section>
                    <a href={"https://www.burgernet.nl/"}>
                        <HomeCard
                            image={burgernet}
                            title={"Burgernet.nl"}
                        />
                    </a>
                </section>
            </main>
        </>
    );
}

export default Home;
