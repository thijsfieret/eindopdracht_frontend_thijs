import React, {useState, useEffect} from 'react';
import styles from '../styles/Vermistevolwassenen.module.css';
import styled from "styled-components";
import Search from "../components/Search";
import geenfoto from "../assets/geenfoto.png";

function VermisteVolwassenen() {
    const [allVermistevolwassenen, setAllVermistevolwassenen] = useState([]);

    useEffect(() => {
        getAllVermistevolwassenen();
    }, []);

    const getAllVermistevolwassenen = async () => {
            const api = await fetch('https://cors-anywhere.herokuapp.com/api.politie.nl/v4/vermist/vermistevolwassenen?language=nl&lat=52.3702157&lon=4.8951679&radius=25.0&maxnumberofitems=25&offset=0');
            const data = await api.json();
            setAllVermistevolwassenen(data.vermisten)
        };

        return (
            <div className={styles.vermistevolwassenendiv}>
                <Search/>
                    <h1 className={styles.vermistevolwassenentitel}>Alle vermiste volwassenen</h1>
                    <h4 className={styles.vermistevolwassenenondertitel}>klik op een foto voor meer informatie</h4>
                <Wrapper>


                    {allVermistevolwassenen.map(bericht => {
                        const image=bericht.afbeeldingen && bericht.afbeeldingen.length > 0 ? bericht.afbeeldingen[0].url : geenfoto
                        return <a href={bericht.url} key={bericht.titel}>
                            <div className={styles.Knoppen}><h4>{bericht.titel}</h4><img src={image} alt={geenfoto}/></div></a>
                    })}
                </Wrapper>
            </div>
        );
    }

const Wrapper = styled.div`
  margin: 5rem 5rem;
  display: inline-flex ;
  flex-wrap: wrap;
  
`
export default VermisteVolwassenen;