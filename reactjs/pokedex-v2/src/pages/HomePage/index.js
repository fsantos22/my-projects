import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { PokemonsContainer } from "./styled";
import { BASE_URL } from "./../../parameters/API";
import Card from "../../components/Card";
import { Button } from "../../components/GlobalStyleds/GlobalStyleds";
import { GlobalStateContext } from "./../../contexts/GlobalStateContext";
import Pagination from "./../../components/Pagination/index";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const history = useHistory();

  const [pokemons, setPokemons] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [limitSearch, setLimitSearch] = useState("1118");

  // PAGINAÇÃO ---------------------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const pokesPerPage = "20";
  // -------------------------------------------------------

  const { camelCase, pokedex } = useContext(GlobalStateContext);

  useEffect(() => {
    let storedPokemons = JSON.parse(localStorage.getItem("pokemons"));
    if (storedPokemons && storedPokemons.length > 0) {
      setPokemons(storedPokemons);
    } else {
      getPokemons();
    }
  }, [pokedex]);

  useEffect(() => {
    if (limitSearch === "") {
      setLimitSearch("1118");
    }
  }, [limitSearch]);

  const getPokemons = async () => {
    try {
      const res = await axios.get(`${BASE_URL}?limit=${limitSearch}`);
      let newArr = res.data.results;
      newArr.forEach((pokemon) => {
        pokemon.name = camelCase(pokemon.name).replace("-", " ");
        pokemon.id = Number(pokemon.url.split("/")[pokemon.url.split("/").length - 2]);
        pokemon.imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
      });

      for (let idx = 0; idx < pokedex.length; idx++) {
        let index = newArr.findIndex(
          (pokemon) => pokemon.id == pokedex[idx].id
        );
        if (index >= 0) {
          newArr.splice(index, 1);
        }
      }
      localStorage.setItem("pokemons", JSON.stringify(newArr));
      setPokemons(newArr);
    } catch (err) {
      alert(err);
    }
  };

  const randomList = () => {
    if(limitSearch >1 && limitSearch < 1118) {
      axios
        .get(`${BASE_URL}?limit=1118`)
        .then((res) => {
          let newArr = res.data.results;
          console.log(res.data.results);
          newArr.forEach((pokemon) => {
            pokemon.name = camelCase(pokemon.name).replace("-", " ");
            pokemon.id = Number(
              pokemon.url.split("/")[pokemon.url.split("/").length - 2]
            );
            pokemon.imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
          });

          console.log(newArr);

          let newList = [];
          let randomIndex = Math.floor(Math.random() * 1118) + 1;
          let match = -1;

          newList.push(newArr[randomIndex]);

          for (let i = 1; i < limitSearch; i++) {
            randomIndex = Math.floor(Math.random() * 1118) + 1;
            match = newList.findIndex(
              (pokemon) => pokemon.id == newArr[randomIndex].id
            );
            while (match > -1) {
              randomIndex = Math.floor(Math.random() * 1188) + 1;
              match = newList.findIndex(
                (pokemon) => pokemon.id == newArr[randomIndex].id
              );
            }
            newList.push(newArr[randomIndex]);
          }

          for (let idx = 0; idx < pokedex.length; idx++) {
            let index = newList.findIndex(
              (pokemon) => pokemon.id == pokedex[idx].id
            );
            if (index >= 0) {
              newList.splice(index, 1);
            }
          }
          localStorage.setItem("pokemons", JSON.stringify(newList));
          setPokemons(newList);
        })
        .catch((err) => {
          alert(err);
        });
    } else{
      getPokemons()
    }
  };

  const filterPokemons = () => {
    if (searchName.length === 0) {
      let filteredByName = currentPokes.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchName.toLowerCase())
      );
      return filteredByName;
    } else {
      currentPokes = pokemons.slice(0, limitSearch);
      let filteredByName = currentPokes.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchName.toLowerCase())
      );
      return filteredByName;
    }
  };

  // PAGINAÇÃO-----------------------------------------
  const indexOfLastPoke = currentPage * pokesPerPage;
  const indexOfFirstPoke = indexOfLastPoke - pokesPerPage;
  let currentPokes = pokemons.slice(indexOfFirstPoke, indexOfLastPoke);
  const paginate = (pageNumber) => {
    if (
      pageNumber > 0 &&
      pageNumber <= Math.ceil(pokemons.length / pokesPerPage)
    ) {
      setCurrentPage(pageNumber);
      history.push(`/page/${pageNumber}`);
    } else {
      alert("Escolha um número válido.");
    }
  };
  // ------------------------------------------------------

  const filteredPokemons = filterPokemons();

  return (
    <div>
      <PokemonsContainer>
        <div className="filter-container">
          <div className="searchbar">
            <input
              placeholder="Buscar Pokémon"
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>
          <div className="number-filter">
            <input
              type="number"
              min="1"
              placeholder="Escolha de 1 a 1118 Pokémons"
              onChange={(e) => setLimitSearch(e.target.value)}
            />
            <div className="btn-container">
              <Button borderRadius="10px 0 0 10px" onClick={() => getPokemons()}>Lista Padrão</Button>
              <Button borderRadius="0 10px 10px 0" onClick={() => randomList()}>Lista aleatória</Button>
            </div>
          </div>
        </div>

        <div>
          <Pagination
            pokesPerPage={pokesPerPage}
            totalPokes={pokemons.length}
            paginate={paginate}
          />
        </div>

        <div className="pokemons-list">
          {pokemons.length > 0 &&
            filteredPokemons.map((pokemon) => {
              return (
                <Card
                  key={pokemon.id}
                  pokemonId={pokemon.id}
                  name={pokemon.name}
                  image={pokemon.imgUrl}
                />
              );
            })}
        </div>
      </PokemonsContainer>
    </div>
  );
};

export default HomePage;
