import React, {useState, useEffect} from 'react';
import axios from "axios";
import styles from '../styles/Wijkagenten.module.css';
import WijkagentenSearch from "../components/WijkagentenSearch";
import styled from "styled-components";
import geenfoto from "../assets/geenfoto.png";
import nederlandkaart from "../assets/nederlandkaart.jpg";

function Wijkagenten() {
    const [error, toggleError] = useState(false);
    const [allWijkagenten, setAllWijkAgenten] = useState([]);
        async function getQuestionData(question1, question2, question3) {
            toggleError(false);

            try {
                const result = await axios.get(
                    `https://cors-anywhere.herokuapp.com/api.politie.nl/v4/wijkagenten?language=nl&lat=${question1}&lon=${question2}&radius=${question3}&maxnumberofitems=10&offset=0`
                );
                setAllWijkAgenten(result.data.wijkagenten);
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
        }

    function handleSearch(question1, question2, question3) {
        getQuestionData(question1, question2, question3);
    }

    return (
        <>
            <main>
                <Grid1>
                    <Component>
                <section>
                    <p className={styles.Titel}>Wijkagenten</p>
                </section>
                <section>
                    <p>
                        Vul de GPS-coördinaten in:
                    </p>
                </section>
                <section>
                    <WijkagentenSearch handleSearch={handleSearch} />
                </section>
                    </Component>
                </Grid1>
                <section>

                    {error && (
                        <>
                            <div className={styles.hulptekst}>
                                <p>Geen agenten gevonden rond deze coördinaten.</p>
                                <p>Gebruik anders de kaart hieronder om geldige coördinaten te vinden</p>
                                <h4>Tip: Hover over de afbeelding om hem te vergroten</h4>
                                    <br></br>
                                <img src={nederlandkaart} alt="geenfoto" className={styles.plaatjenederland} />
                            </div>
                        </>
                    )}

                    {allWijkagenten && (
                                <Wrapper>
                                    <h3>Hier zijn de gevonden resultaten.</h3>
                                    <Grid2>
                                            {allWijkagenten.map((wijkagenten) => {
                                                const image = wijkagenten.afbeelding.url || geenfoto;
                                                return (
                                                    <grid key={wijkagenten.naam}>
                                                            <a href={wijkagenten.url}>
                                                                <Card>
                                                                    <h3>{wijkagenten.naam}</h3>
                                                                    <img src={image} alt="geenfoto"/>
                                                                    <p>{wijkagenten.telefoon.toString()}</p>
                                                                    <p>{wijkagenten.werkgebied.toString()}</p>
                                                                </Card>
                                                                <br></br>
                                                            </a>
                                                    </grid>
                                            );
                                        })}
                                    </Grid2>
                                </Wrapper>
                    )}
                </section>
            </main>
        </>
    );
}
const Grid2 = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); 
  grid-template-rows: auto; 
  grid-auto-rows: 1fr;
  grid-auto-flow: row; 
  grid-gap: 3rem;
  margin: 2rem;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;
const Grid1 = styled.div`
  display: flex;
  grid-template-columns: repeat(3, 1fr); 
  grid-template-rows: repeat(3, 1fr); 
  grid-auto-rows: 1fr; 
  grid-auto-flow: row; 
  grid-gap: 3rem;
  margin: 2rem;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;
const Component = styled.div`  
  height: auto;
  width: auto;
  overflow: hidden;
  position: center;
  margin: 1rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  margin: 2rem 2rem;
  display: inline-flex ;
  flex-wrap: wrap;
`

const Card = styled.div`  
  height: auto;
  width: auto;
  overflow: hidden;
  position: relative;
  margin: 1rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  }

  img {
    max-width: 280px;
    height: 368px;
    margin-top: 1rem;
    //object-fit: cover; DIT MAAKT DE PLAATJES GROTER
  }
`;
export default Wijkagenten;