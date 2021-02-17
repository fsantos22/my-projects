import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { goToPage } from "../../router/Coordinator";
import GlobalStateContext from "../../contexts/GlobalStateContext";
import { Container } from "./styled";
import { Button } from './../GlobalStyleds/GlobalStyleds';

const Card = (props) => {
  const history = useHistory();
  const { pokedex, addToPokedex, removeFromPokedex } = useContext(
    GlobalStateContext
  );

  const currentPathname = window.location.pathname; //CAPTURA O CAMINHO DA URL

  useEffect(() => {
    if (pokedex && pokedex.length > 0) {
      localStorage.setItem("pokedex", JSON.stringify(pokedex));
    }
  }, [pokedex]);

  return (
    <Container>
      <div className="label-container">
        <h2>{props.name}</h2>
      </div>
      <div className="img-container">
        <img src={props.image} alt="pokemon image" />
      </div>
      <div className="cards-btn-container">
        {currentPathname === "/pokedex" ? (
          <Button
            borderRadius="0 0 0 5px"
            onClick={() => removeFromPokedex(props.pokemonId)}
          >
            Libertar
          </Button> //SE ESTIVER NA PÁGINA DA POKEDEX, O TEXTO DO BOTÃO MUDA PARA 'LIBERTAR'
        ) : (
          <Button
            borderRadius="0 0 0 5px"
            onClick={() => addToPokedex(props.pokemonId)}
          >
            Capturar
          </Button> //SE ESTIVER NAS OUTRAS PÁGINAS, O TEXTO DO BOTÃO MUDA PARA 'CAPTURAR'
        )}
        <Button
          borderRadius="0 0 5px 0"
          onClick={() => goToPage(history, `/poke-detail/${props.pokemonId}`)}
        >
          Detalhes
        </Button>
      </div>
    </Container>
  );
};

export default Card;
