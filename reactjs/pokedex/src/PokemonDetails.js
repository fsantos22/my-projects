import axios from "axios";
import React from "react";
import styled from "styled-components";
import { ProgressBar } from "./components/ProgressBar";

const Container = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  max-width: 300px;
  width: 90%;
  padding: 10px;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  max-height: 98%;
  .stats-container {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
  .pokemon-image {
    width: 50%;
    justify-self: center;
  }
  .delete-btn {
    float: right;
    width: 20px;
    height: 20px;
    background-color: red;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 50%;
  }
  span {
    font-weight: bold;
  }
`;

const WhiteBg = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.7);
`;

export class PokemonDetails extends React.Component {
  state = { pokemon: {} };

  componentDidMount() {
    this.getDetails();
  }

  getDetails = async () => {
    try {
      const res = await axios.get(
        `${this.props.baseUrl}pokemon/${this.props.id}`
      );
      // Compilando os dados que me interessam na API
      let details = {},
        abilities = [],
        types = [];
      details.id = this.props.id;
      details.name = this.props.name;
      details.height = res.data.height*10;
      details.weight = res.data.weight/10;
      details.imgUrl = res.data.sprites.front_default;
      res.data.stats.map((pokemon) => {
        switch (pokemon.stat.name) {
          case "hp":
            details.hp = pokemon.base_stat;
            break;
          case "attack":
            details.attack = pokemon.base_stat;
            break;
          case "defense":
            details.defense = pokemon.base_stat;
            break;
          case "special-attack":
            details.specialAttack = pokemon.base_stat;
            break;
          case "special-defense":
            details.specialDefense = pokemon.base_stat;
            break;
          case "speed":
            details.speed = pokemon.base_stat;
            break;
        }
      });
      res.data.abilities.forEach((pokemon, index) => {
        if (index === 0) {
          abilities[index] = pokemon.ability.name
            .toLowerCase()
            .split(" ")
            .map(
              (letter) => letter.charAt(0).toUpperCase() + letter.substring(1)
            )
            .join(" ");
        } else {
          let ability = pokemon.ability.name
            .toLowerCase()
            .split(" ")
            .map(
              (letter) => letter.charAt(0).toUpperCase() + letter.substring(1)
            )
            .join(" ");
          abilities[index] = ` / ${ability}`;
        }
      });
      res.data.types.forEach((pokemon, index) => {
        if (index === 0) {
          types[index] = pokemon.type.name
            .toLowerCase()
            .split(" ")
            .map(
              (letter) => letter.charAt(0).toUpperCase() + letter.substring(1)
            )
            .join(" ");
        } else {
          let type = pokemon.type.name
            .toLowerCase()
            .split(" ")
            .map(
              (letter) => letter.charAt(0).toUpperCase() + letter.substring(1)
            )
            .join(" ");
          types[index] = ` / ${type}`;
        }
      });
      details.abilities = abilities;
      details.types = types;
      //   -----------------------------------------------
      this.setState({ pokemon: details });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { pokemon } = this.state;
    return (
      <>
        <WhiteBg></WhiteBg>
        <Container>
          <button className="delete-btn" onClick={this.props.openDetails}>
            X
          </button>
          <p>
            <span>Nome:</span> {pokemon.name}
          </p>
          <p>
            <span>Tipo:</span> {pokemon.types}
          </p>
          <p>
            <span>Habilidades:</span> {pokemon.abilities}
          </p>
          <p>
            <span>Altura:</span> {pokemon.height}cm
          </p>
          <p>
            <span>Peso:</span> {pokemon.weight}kg
          </p>
          <div className="stats-container">
            <img className="pokemon-image" src={pokemon.imgUrl} alt="" />
            <div>
              <ProgressBar label="HP: " value={pokemon.hp} />
              <ProgressBar label="Ataque: " value={pokemon.attack} />
              <ProgressBar label="Defesa: " value={pokemon.defense} />
              <ProgressBar label="Velocidade: " value={pokemon.speed} />
            </div>
          </div>
        </Container>
      </>
    );
  }
}
