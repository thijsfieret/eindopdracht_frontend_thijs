import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Search from "../components/Search";
import styles from "../styles/Searched.module.css";
import axios from "axios";
import geenfoto from "../assets/geenfoto.png";

function Searched() {
    const [searchedZoekopdracht, setSearchedZoekopdracht] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, setLoading] = useState(true);
    const params = useParams();

    useEffect(() => {
        async function getSearched(Zoekopdracht) {
            setLoading(true);
            toggleError(false);
            try {
                const result = await axios.get(
                    `https://cors-anywhere.herokuapp.com/api.politie.nl/v4/gezocht/dossiers?language=nl&query=${Zoekopdracht}&radius=5.0&maxnumberofitems=10&offset=0`
                );
                setSearchedZoekopdracht(result.data.opsporingsberichten);
                setLoading(false);
            } catch (e) {
                console.error(e);
                toggleError(true);
                setLoading(false);
            }
        }
        getSearched(params.search);
    }, [params.search]);

    return (
        <div>
            <Search />
            <br></br>
            <h1 className={styles.searchedtitel}>Zoekopdracht {params.search}</h1>
            <Wrapper>
                {loading ? (
                    <p className={styles.politiebureaudiv}>Een moment geduld a.u.b.. De API is bezig met je zoekopdracht.</p>
                ) : error ? (
                    <p className={styles.politiebureaudiv}>Oh oh. Hier ging iets mis. Probeer het opnieuw!</p>
                ) : searchedZoekopdracht && searchedZoekopdracht.length > 0 ? (
                    searchedZoekopdracht.map((bericht) => {
                        const image =
                            bericht.afbeeldingen && bericht.afbeeldingen.length > 0
                                ? bericht.afbeeldingen[0].url
                                : geenfoto;
                        return (

                            <Card key={bericht.uid}>
                                <div className={styles.politiebureaudiv}>
                                    <p>
                                        <a
                                            href={bericht.url}
                                            className={styles.politiebureaunaam}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {bericht.titel}
                                        </a>
                                    </p>
                                    <img src={image} alt="geenfoto" />
                                    <p className={styles.politiebureaustekst}>
                                        Case: {bericht.introductie || ""}
                                    </p>
                                    {bericht.dossier?.zaakcontent?.map((content, i) => (
                                        <p className={styles.politiebureaustekst} key={i}>
                                            Zaakcontent {i + 1}: {content.titel} <p className={styles.politiebureaustekst}> {content.opgemaaktetekst}</p>
                                        </p>
                                    ))}
                                </div>
                            </Card>
                        );
                    })
                ) : (
                    <p className={styles.politiebureaudiv}>Geen berichten gevonden. Probeer anders een veelvoorkomende zoekterm zoals "Hond", "Buiten" of "Avond"</p>
                )}
            </Wrapper>
        </div>
    );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
`;

export default Searched;