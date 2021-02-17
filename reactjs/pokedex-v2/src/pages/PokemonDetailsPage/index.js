import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "../../components/GlobalStyleds/GlobalStyleds";
import GlobalStateContext from "../../contexts/GlobalStateContext";
import { goToPage } from "../../router/Coordinator";
import {
  ContainerPokemonDetails,
  ContainerContentPokemon,
  ProgressBar,
  Background,
  Progress,
} from "../PokemonDetailsPage/styled";
import bug from "../../images/types/bug.png";
import dark from "../../images/types/dark.png";
import dragon from "../../images/types/dragon.png";
import electric from "../../images/types/electric.png";
import fairy from "../../images/types/fairy.png";
import fighting from "../../images/types/fighting.png";
import fire from "../../images/types/fire.png";
import flying from "../../images/types/flying.png";
import ghost from "../../images/types/ghost.png";
import grass from "../../images/types/grass.png";
import ground from "../../images/types/ground.png";
import ice from "../../images/types/ice.png";
import normal from "../../images/types/normal.png";
import poison from "../../images/types/poison.png";
import psychic from "../../images/types/psychic.png";
import rock from "../../images/types/rock.png";
import steel from "../../images/types/steel.png";
import water from "../../images/types/water.png";

const PokemonDetailsPage = () => {
  const history = useHistory();
  const { pokemonId } = useParams();

  const {
    pokedex,
    getPokemonDetails,
    pokemonDetails,
    addToPokedex,
    removeFromPokedex,
    camelCase,
  } = useContext(GlobalStateContext);

  const pokeIndex = pokedex.findIndex((pokemon) => pokemon.id == pokemonId);
  useEffect(() => {
    getPokemonDetails(pokemonId);
    if (pokedex.length > 0) {
      localStorage.setItem("pokedex", JSON.stringify(pokedex));
    }
  }, [pokedex]);

  const stats =
    pokemonDetails.stats &&
    pokemonDetails.stats.map((stat) => {
      return (
        <>
          <ProgressBar key={stat.stat.name}>
            <Background />
            <p className="label">
              <strong>{camelCase(stat.stat.name).replace("-", " ")}:</strong>{" "}
              {stat.base_stat}
            </p>
            <Progress percent={stat.base_stat} />
          </ProgressBar>
        </>
      );
    });

  let img = "";
  const types =
    pokemonDetails.types &&
    pokemonDetails.types.map((type) => {
      switch (type.type.name) {
        case "bug":
          img = <img className="type-img" src={bug} />;
          break;
        case "dark":
          img = <img className="type-img" src={dark} />;
          break;
        case "dragon":
          img = <img className="type-img" src={dragon} />;
          break;
        case "electric":
          img = <img className="type-img" src={electric} />;
          break;
        case "fairy":
          img = <img className="type-img" src={fairy} />;
          break;
        case "fighting":
          img = <img className="type-img" src={fighting} />;
          break;
        case "fire":
          img = <img className="type-img" src={fire} />;
          break;
        case "flying":
          img = <img className="type-img" src={flying} />;
          break;
        case "ghost":
          img = <img className="type-img" src={ghost} />;
          break;
        case "grass":
          img = <img className="type-img" src={grass} />;
          break;
        case "ground":
          img = <img className="type-img" src={ground} />;
          break;
        case "ice":
          img = <img className="type-img" src={ice} />;
          break;
        case "normal":
          img = <img className="type-img" src={normal} />;
          break;
        case "poison":
          img = <img className="type-img" src={poison} />;
          break;
        case "psychic":
          img = <img className="type-img" src={psychic} />;
          break;
        case "rock":
          img = <img className="type-img" src={rock} />;
          break;
        case "steel":
          img = <img className="type-img" src={steel} />;
          break;
        case "water":
          img = <img className="type-img" src={water} />;
          break;
        default:
          img = "";
      }
      return <div key={type.type.name}>{img}</div>;
    });

  const moves =
    pokemonDetails.moves &&
    pokemonDetails.moves.map((move) => {
      return <p key={move.move.name}>{camelCase(move.move.name).replace("-"," ")}</p>;
    });

  return (
    <ContainerPokemonDetails>
      <div className="back-btn">
        <Button borderRadius="10px" onClick={() => goToPage(history, "/")}>
          Voltar
        </Button>
      </div>
      {pokeIndex !== -1 ? (
        <div className="catch-btn">
          <Button
            borderRadius="10px"
            onClick={() => removeFromPokedex(pokemonId)}
          >
            Libertar
          </Button>
        </div>
      ) : (
        <div className="catch-btn">
          <Button borderRadius="10px" onClick={() => addToPokedex(pokemonId)}>
            Capturar
          </Button>
        </div>
      )}
      {pokemonDetails && (
        <>
          <h2 className="name-title">{pokemonDetails.name}</h2>
          <ContainerContentPokemon>
            <div className="imgs-Pokemon">
              <img
                src={
                  pokemonDetails.sprites && pokemonDetails.sprites.front_default
                }
              />
              <img
                src={
                  pokemonDetails.sprites && pokemonDetails.sprites.back_default
                }
              />
            </div>
            <div className="stats">
              <h2>Estatísticas</h2>
              {pokemonDetails.stats && stats}
            </div>
            <div className="types-And-Moves">
              <div className="types">{types}</div>
              <div className="moves">
                <h2>Ataques</h2>
                <div>{moves}</div>
              </div>
            </div>
          </ContainerContentPokemon>
        </>
      )}
    </ContainerPokemonDetails>
  );
};

export default PokemonDetailsPage;
