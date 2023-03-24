import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import "@splidejs/splide/dist/css/splide.min.css";
import styles from "../styles/Politiebureaus.module.css"
import Search from "../components/Search";

function removeTags(str) {
    if ((str === null) || (str === "")) {
        return "";
    }
    else {
        str = str.toString();
        return str.replace(/<[^>]*>/g, "");
    }
}

function Politiebureaus() {
    const [allPolitiebureaus, setAllPolitiebureaus] = useState([]);

    useEffect(() => {
        getPolitiebureaus();
    }, []);

    const getPolitiebureaus = async () => {
            const api = await fetch('https://cors-anywhere.herokuapp.com/api.politie.nl/v4/politiebureaus?language=nl&lat=52.3702157&lon=4.8951679&radius=25.0&maxnumberofitems=25&offset=0')
            const data = await api.json();
            setAllPolitiebureaus(data.politiebureaus)
        }

    return (
        <div>
            <Search/>
            <Wrapper className={styles.politiebureauwrapper}>
                <h1 className={styles.politiebureautitel}>Politiebureaus</h1>
                {allPolitiebureaus.map(bericht => {
                    //const image=bericht.afbeeldingen && bericht.afbeeldingen.length > 0 ? bericht.afbeeldingen[0].url : geenfoto
                    return <Card key={bericht.naam}><div className={styles.politiebureaudiv}>
                            <p><a href={bericht.url} className={styles.politiebureaunaam}>{bericht.naam}</a></p>
                            <p><a href={bericht.url} className={styles.politiebureauplaats}>Plaats: {bericht.bezoekadres.plaats.toString()}</a></p>
                            <p className={styles.politiebureaustekst}>Adres: {bericht.bezoekadres.postadres.toString()}</p>
                            <p className={styles.politiebureaustekst}>Postcode: {bericht.bezoekadres.postcode.toString()}</p>
                            <span className={styles.politiebureaustekst}>Openingstijden: {removeTags(bericht.openingstijden)}</span>
                            <p className={styles.politiebureaustekst}>Telefoonnummer: {bericht.telefoonnummer}</p>
                        </div>
                            <br></br>
                        </Card>
                })}
            </Wrapper>
        </div>
    );
}

const Wrapper = styled.div`
    margin: 4rem 0rem;
`

const Card = styled.div` 
      min-height: 7rem;
      border-radius: 2rem;

      width: 50%;
    `;

export default Politiebureaus;
