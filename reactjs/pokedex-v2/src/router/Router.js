import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import HomePage from "./../pages/HomePage/index";
import PokemonDetailsPage from "./../pages/PokemonDetailsPage/index";
import PokedexPage from "./../pages/PokedexPage/index";
import Header from "./../components/Header/index";
import bg from "../images/pokemon-pattern.jpg";
import { Background } from "./../components/GlobalStyleds/GlobalStyleds";
import BattlePage from './../pages/BattlePage/index';
import Error from './../pages/Error/index';

const Container = styled.div`
  margin-top: 70px;
`;

const Router = () => {
  return (
    <BrowserRouter>
      <Background image={bg} />
      <Header />
      <Container>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/poke-detail/:pokemonId">
            <PokemonDetailsPage />
          </Route>
          <Route exact path="/pokedex">
            <PokedexPage />
          </Route>
          <Route exact path="/battle">
            <BattlePage />
          </Route>
          <Route exact path="/page/:listpage?">
            <HomePage />
          </Route>
          <Route>
            <Error />
          </Route>
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default Router;
