import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import "@splidejs/splide/dist/css/splide.min.css";
import Search from "../components/Search";
import styles from "../styles/AlleOpsporingsberichten.module.css"
import geenfoto from "../assets/geenfoto.png";

function AlleOpsporingsberichten() {
    const [AlleOpsporingsberichten, setAlleOpsporingsberichten] = useState([]);
    useEffect(() => {
        getAllOpsporingsberichten();
    }, []);

    const getAllOpsporingsberichten = async () => {

        const api = await fetch('https://cors-anywhere.herokuapp.com/api.politie.nl/v4/gezocht?language=nl&lat=52.3702157&lon=4.8951679&radius=25.0&maxnumberofitems=25&offset=0');
        const data = await api.json();
        setAlleOpsporingsberichten(data.opsporingsberichten)
    };

    return (
        <div>
            <Search/>
            <br></br>
            <h1 className={styles.opsporingstitel}>Alle Opsporingsberichten</h1>
            <Wrapper className={styles.opsporingswrapper}>
                {AlleOpsporingsberichten.map(bericht => {
                    const image=bericht.afbeeldingen && bericht.afbeeldingen.length > 0 ? bericht.afbeeldingen[0].url : geenfoto
                    return <a href={bericht.url} key={bericht.titel}>
                   <div ><p>{bericht.titel}</p><img src={image}/></div>
                        <br></br>
                    </a>
                })}
            </Wrapper>
        </div>
    );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`
export default AlleOpsporingsberichten;
