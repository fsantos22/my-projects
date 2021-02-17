import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Wrapper, MainWrapper, CardContainer, PokemonContainer } from "./styled";
import Card from "../../components/Card";
import { Button } from "../../components/GlobalStyleds/GlobalStyleds";
import { goToPage } from "../../router/Coordinator";
import vs from "../../images/vs-logo.png";
import loading from "../../images/loading.gif";
import loadingBattle from "../../images/loading2.gif";
import { GlobalStateContext } from "./../../contexts/GlobalStateContext";

const BattlePage = () => {
  const history = useHistory();
  const { pokedex, setPokedex } = useContext(GlobalStateContext);

  console.log('pokedex', pokedex)

  const [pokemonA, setPokemonA] = useState({});
  const [pokemonB, setPokemonB] = useState({});
  const [vencedor, setVencedor] = useState("");
  const [openResult, setOpenResult] = useState(false);
  const [loadingResult, setLoadingResult] = useState(true);

  const chooseA = (e) => {
    setOpenResult(false);
    setLoadingResult(true);
    const name = e.target.value;
    const indexA = pokedex.findIndex((pokemon) => pokemon.name == name);
    if (indexA >= 0) {
      const pokeData = {
        id: pokedex[indexA].id,
        name: pokedex[indexA].name,
        stats: pokedex[indexA].stats,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokedex[indexA].id}.png`,
      };
      setPokemonA(pokeData);
    } else {
      const pokeData = {
        img: loading,
      };
      setPokemonA(pokeData);
    }
  };

  const chooseB = (e) => {
    setOpenResult(false);
    setLoadingResult(true);
    const name = e.target.value;
    const indexB = pokedex.findIndex((pokemon) => pokemon.name == name);
    if (indexB >= 0) {
      const pokeData = {
        id: pokedex[indexB].id,
        name: pokedex[indexB].name,
        stats: pokedex[indexB].stats,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokedex[indexB].id}.png`,
      };
      setPokemonB(pokeData);
    } else {
      const pokeData = {
        img: loading,
      };
      setPokemonA(pokeData);
    }
  };

  const battle = (pokemonA, pokemonB) => {
    if (pokemonA.id && pokemonB.id) {
      setOpenResult(true);
      setTimeout(function () {
        setLoadingResult(false);
      }, 2000);
      let totalA = 0;
      for (let i = 0; i < pokemonA.stats.length; i++) {
        totalA += pokemonA.stats[i].base_stat;
      }
      let totalB = 0;
      for (let i = 0; i < pokemonB.stats.length; i++) {
        totalB += pokemonB.stats[i].base_stat;
      }

      if (totalA > totalB) {
        setVencedor(pokemonA.name);
      } else if (totalA < totalB) {
        setVencedor(pokemonB.name);
      } else {
        setVencedor("Empate");
      }
    } else {
      setVencedor("");
    }
  };

  useEffect(() => {
    const storedPokedex = JSON.parse(localStorage.getItem("pokedex"));
    if (storedPokedex.length > 0) {
      setPokedex(storedPokedex);
    }
  }, []);

  return (
    <Wrapper>
      <div className="back-btn">
        <Button onClick={() => goToPage(history, "/")}>Voltar</Button>
      </div>
      <div className="battle-btn">
        <Button onClick={() => battle(pokemonA, pokemonB)}>
          Calcular batalha
        </Button>
      </div>

      <div className="container">
        {openResult && (
          <div className="result-label">
            {loadingResult ? (
              <img src={loadingBattle} />
            ) : (
              <>
                <p>O provável vencedor é:</p>
                <h2>{vencedor}</h2>
              </>
            )}
          </div>
        )}
        <MainWrapper>
          <PokemonContainer>
            <select onChange={(e) => chooseA(e)}>
              <option></option>
              {pokedex.map((pokemon) => {
                return <option key={pokemon.id}>{pokemon.name}</option>;
              })}
            </select>
            <CardContainer>
              <div className="label-container">
                {pokemonA.id && <h2>{pokemonA.name}</h2>}
              </div>
              <div className="img-container">
                {pokemonA.id ? (
                  <img src={pokemonA.img} alt="pokemon image" />
                ) : (
                  <img src={loading} alt="pokemon image" />
                )}
              </div>
            </CardContainer>
          </PokemonContainer>
          <div className="vs-img">
            <img src={vs} alt="" />
          </div>
          <PokemonContainer>
            <select onChange={(e) => chooseB(e)}>
              <option></option>
              {pokedex.map((pokemon) => {
                return <option key={pokemon.id}>{pokemon.name}</option>;
              })}
            </select>
            <CardContainer>
              <div className="label-container">
                {pokemonB.id && <h2>{pokemonB.name}</h2>}
              </div>
              <div className="img-container">
                {pokemonB.name ? (
                  <img src={pokemonB.img} alt="pokemon image" />
                ) : (
                  <img src={loading} alt="pokemon image" />
                )}
              </div>
            </CardContainer>
          </PokemonContainer>
        </MainWrapper>
      </div>
    </Wrapper>
  );
};

export default BattlePage;
