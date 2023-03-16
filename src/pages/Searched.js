import React from "react";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import styled from "styled-components"
import Search from "../components/Search";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import styles from "../styles/Searched.module.css";

function Searched() {
    const [searchedRecipes, setSearchedRecipes] = useState([]);
    let params = useParams();

    const getSearched = async (name) => {
        const data = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=58d9ee76861142d19ae15d8da98f6abf&query=${name}`
        );
        const recipes = await data.json();
        setSearchedRecipes(recipes.results);
    };

    useEffect(() => {
        getSearched(params.search);
    },[params.search]);

    return (
        <div>
        <Search />
            <Wrapper>
                <h3>Hier zijn de gevonden resultaten.</h3>
                <Splide options={{
                    perPage: 4,
                    arrows: false,
                    pagination: false,
                    drag: 'free',
                    gap: "5rem"
                }}
                        >
        {searchedRecipes.map((item) => {
            return(
                <SplideSlide key={item.id}>
                <Card key={item.id}>
                    <Link to={'/recipe/' + item.id}>
                        <p className={styles["p-searched"]}>{item.title}</p>
                        <img className={styles["img-searched"]} src={item.image} alt="" />

                    </Link>
                </Card>
                </SplideSlide>
            )
        })}
                </Splide>
            </Wrapper>
        </div>
   );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
`;

export default Searched;