import React from "react";
import axios from "axios";
import styled from "styled-components";
import { PokemonCard } from "./components/PokemonCard";
import { PokemonDetails } from "./PokemonDetails";
import PokeDex1 from "./imgs/pokedex-cima.jpg";
import PokeDex2 from "./imgs/pokedex-baixo.jpg";
import loadingGif from "../src/imgs/loading.gif";

const Case = styled.div`
  position: absolute;
  height: 100vh;
  width: 56.25vh;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  z-index: 999;

  background-image: url(${loadingGif});
  background-size: 97% auto;
  background-repeat: no-repeat;
  background-position: center;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;

  #cima {
    position: relative;
    top: 0;
  }
  #baixo {
    position: relative;
    bottom: 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 55vh;
  max-width: 750px;
  height: 100vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20vh 0;

  z-index: 1;

  .content-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    border: 2px solid black;
    background-color: #181b1d;
  }

  .titulo {
    padding: 10px;
    width: 100%;
    background-color: red;
    text-align: center;
    color: white;
  }

  input {
    height: 2rem;
    width: 90%;
    padding: 10px;
    border-radius: 15px;
  }

  #powerOffBtn {
    width: 30px;
    margin: 5px;
    color: white;
    border-radius: 50%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #fff;
    /* z-index: 2; */
    cursor: pointer;
    img {
      width: 100%;
      color: white;
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  height: 90%;
  overflow-y: auto;

  /* width */
  ::-webkit-scrollbar {
    width: 15px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    background-color: white;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #c81f32;
    border: 2px solid rgb(50, 50, 50);
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #b30000;
  }
`;

export class Pokemons extends React.Component {
  state = {
    baseUrl: "https://pokeapi.co/api/v2/",
    pokemons: [],
    openDetails: false,
    openPokeDex: false,
    targetId: 0,
    searchName: "",
  };

  componentDidMount() {
    this.getAllPokemons();
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  sortAZ = (a, b) => {
    if (a.id < b.id) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    } else {
      return 0;
    }
  };

  getAllPokemons = async () => {
    const { baseUrl } = this.state;
    try {
      const res = await axios.get(`${baseUrl}pokemon?limit=151&offset=0`);
      let newArr = res.data.results.sort(this.sortAZ);
      //   Adicionado Id e link de imagem ao Array de Pokemons
      newArr.forEach((pok) => {
        // Colocando a primeira letra maiúscula
        pok.name = pok.name
          .toLowerCase()
          .split(" ")
          .map((letter) => letter.charAt(0).toUpperCase() + letter.substring(1))
          .join(" ");
        pok.id = Number(pok.url.split("/")[pok.url.split("/").length - 2]);
        pok.imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pok.id}.png`;
      });
      this.setState({ pokemons: newArr });
    } catch (err) {
      console.log(err);
    }
  };

  openDetails = (pokemon) => {
    this.setState({
      openDetails: !this.state.openDetails,
      targetId: pokemon.id,
      targetName: pokemon.name,
    });
  };

  filtered = () => {
    const { pokemons } = this.state;
    let filter = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(this.state.searchName.toLowerCase())
    );
    return filter;
  };

  onChangeSearchName = (e) => {
    this.setState({ searchName: e.target.value });
  };

  onPokedex = () => {
    this.setState({ openPokeDex: true });
    let cima = "";
    let baixo = "";
    let dex = "";

    cima = document.getElementById("cima");
    cima.style.top = "0";
    cima.style.top = parseInt(cima.style.top) + -30 + "vh";
    cima.style.transition = "2s";

    baixo = document.getElementById("baixo");
    baixo.style.bottom = "0";
    baixo.style.bottom = parseInt(baixo.style.bottom) + -30 + "vh";
    baixo.style.transition = "2s";

    dex = document.getElementById("poke");
    setTimeout(function () {
      dex.style.zIndex = "1";
    }, 3000);
  };

  offPokedex = () => {
    this.setState({ openPokeDex: false });
    let cima = "";
    let baixo = "";
    let dex = "";

    cima = document.getElementById("cima");
    cima.style.top = "0";
    cima.style.top = parseInt(cima.style.top) + 0 + "px";
    cima.style.transition = "2s";

    baixo = document.getElementById("baixo");
    baixo.style.bottom = "0";
    baixo.style.bottom = parseInt(baixo.style.bottom) + 0 + "px";
    baixo.style.transition = "2s";

    dex = document.getElementById("poke");
    dex.style.zIndex = "999";
  };

  render() {
    const { baseUrl, pokemons, openDetails, targetId, targetName } = this.state;
    let filtered = this.filtered();
    return (
      <>
        <Case id="poke">
          <img id="cima" onClick={this.onPokedex} src={PokeDex1} alt="" />
          <img id="baixo" onClick={this.onPokedex} src={PokeDex2} alt="" />
        </Case>
        <Wrapper>
          <div className="content-box" onClick={this.offPokedex}>
            <div id="powerOffBtn">
              <img src="data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGc+PHBhdGggZD0ibTI1NiAwYy0xNDEuMTYgMC0yNTYgMTE0Ljg0LTI1NiAyNTZzMTE0Ljg0IDI1NiAyNTYgMjU2IDI1Ni0xMTQuODQgMjU2LTI1Ni0xMTQuODQtMjU2LTI1Ni0yNTZ6bTAgNDc4LjAyYy0xMjIuNDIgMC0yMjIuMDItOTkuNi0yMjIuMDItMjIyLjAyczk5LjYtMjIyLjAyIDIyMi4wMi0yMjIuMDIgMjIyLjAyIDk5LjYgMjIyLjAyIDIyMi4wMi05OS42IDIyMi4wMi0yMjIuMDIgMjIyLjAyeiIvPjxwYXRoIGQ9Im0yNTYgNjcuOTZjLTEwMy42OCAwLTE4OC4wNCA4NC4zNi0xODguMDQgMTg4LjA0czg0LjM2IDE4OC4wNCAxODguMDQgMTg4LjA0IDE4OC4wNC04NC4zNiAxODguMDQtMTg4LjA0LTg0LjM2LTE4OC4wNC0xODguMDQtMTg4LjA0em0tMTUgNzcuNzFjMC04LjI5IDYuNzItMTUgMTUtMTVzMTUgNi43MSAxNSAxNXYxMjJjMCA4LjI4LTYuNzIgMTUtMTUgMTVzLTE1LTYuNzItMTUtMTV6bTE1IDIxNC42MWMtODIuNjc1IDAtMTMyLjA5Ny05MS45NDgtODcuNjgtMTYwLjc0IDQuNDktNi45NiAxMy43Ny04Ljk2IDIwLjczLTQuNDdzOC45NyAxMy43NyA0LjQ3IDIwLjczYy0zMS41NjUgNDguOTQyIDMuNTM2IDExNC40OCA2Mi40OCAxMTQuNDggNTguOTYgMCA5NC4wMzktNjUuNTQ4IDYyLjQ4LTExNC40OC00LjUtNi45Ni0yLjQ5LTE2LjI0IDQuNDctMjAuNzMgNi45Ni00LjUgMTYuMjQtMi40OSAyMC43MyA0LjQ3IDQ0LjQ4MSA2OC44OTItNS4xIDE2MC43NC04Ny42OCAxNjAuNzR6Ii8+PC9nPjwvc3ZnPg==" />
            </div>
            <input
              placeholder="Digite o nome do Pokémon..."
              value={this.state.searchName}
              onChange={this.onChangeSearchName}
            />
            <Container>
              {filtered.map((pokemon) => {
                return (
                  <PokemonCard
                    key={pokemon.id}
                    id={pokemon.id}
                    name={pokemon.name}
                    imgUrl={pokemon.imgUrl}
                    openDetails={() => this.openDetails(pokemon)}
                  />
                );
              })}
              {openDetails && (
                <PokemonDetails
                  baseUrl={baseUrl}
                  id={targetId}
                  name={targetName}
                  openDetails={this.openDetails}
                />
              )}
            </Container>
          </div>
        </Wrapper>
      </>
    );
  }
}
