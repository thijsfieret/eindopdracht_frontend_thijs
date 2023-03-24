import React, {useState, useEffect} from 'react';
import styles from '../styles/Vermistekinderen.module.css';
import styled from "styled-components";
import Search from "../components/Search";
import geenfoto from "../assets/geenfoto.png";

function Vermistekinderen() {
    const [allVermistekinderen, setAllVermistekinderen] = useState([]);

    useEffect(() => {
        getAllVermistekinderen();
    }, []);

    const getAllVermistekinderen = async () => {
        const api = await fetch('https://cors-anywhere.herokuapp.com/api.politie.nl/v4/vermist/vermistekinderen?language=nl&lat=51.8702157&lon=4.4951679&radius=25.0&maxnumberofitems=25&offset=0');
        const data = await api.json();
        setAllVermistekinderen(data.vermisten)
    };

    return (
        <div className={styles.vermistekinderendiv}>
            <Search/>
            <h1 className={styles.vermistekinderentitel}>Vermiste kinderen</h1>
            <h4 className={styles.vermistekinderenondertitel}>klik op een foto voor meer informatie</h4>
            <Wrapper>


                {allVermistekinderen.map(bericht => {
                    const image=bericht.afbeeldingen && bericht.afbeeldingen.length > 0 ? bericht.afbeeldingen[0].url : geenfoto
                    return <a href={bericht.url} key={bericht.titel}>
                        <div className={styles.Knoppen}><h4>{bericht.titel}</h4><img src={image} className={styles.vermistekinderenimg} alt={geenfoto}/></div></a>
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
export default Vermistekinderen;