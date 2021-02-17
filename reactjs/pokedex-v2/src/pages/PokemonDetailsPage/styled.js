import styled from "styled-components";

export const ContainerPokemonDetails = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 100px;
  cursor: default;
  .back-btn {
    position: absolute;
    top: 80px;
    left: 10px;
  }
  .catch-btn {
    position: absolute;
    top: 80px;
    right: 10px;
  }
  .name-title {
    position: absolute;
    top: 70px;
    text-align: center;
    font-family: "PokemonFont";
    color: #ffcb05;
    font-size: 40px;
    letter-spacing: 3px;
    -webkit-text-stroke-width: 0.7px;
    -webkit-text-stroke-color: #003a70;
    margin: 0;
    @media (max-width: 619px) {
      top: 130px;
    }
  }
`;

export const ContainerContentPokemon = styled.div`
  position: absolute;
  top: 200px;
  display: flex;
  width: 850px;
  max-width: calc(100vw - 20px);
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 10px;
  color: #ffcb05;
  div,
  img {
    border-radius: 10px;
  }
  h2 {
    padding-top: 20px;
    text-align: center;
    font-family: "PokemonFont";
    letter-spacing: 5px;
    font-size: 30px;
    -webkit-text-stroke-width: 0.7px;
    -webkit-text-stroke-color: #003a70;
    margin: 0;
  }
  p {
    margin: 30px;
  }
  .imgs-Pokemon {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    img {
      background-color: #cc0000;
      width: 150px;
      transition: all 0.3s ease-in-out;
      @media (max-width: 619px) {
        width: 135px;
      }
      &:hover {
        box-shadow: 2px 2px 5px black;
        transition: all 0.3s ease-in-out;
      }
    }
    @media screen and (max-width: 619px) {
      flex-direction: row;
      width: 300px;
      margin-top: 25px;
    }
  }
  .stats {
    background-color: #cc0000;
    width: 300px;
    padding: 15px 0;
    transition: all 0.3s ease-in-out;
    overflow-x: hidden;
    &:hover {
      box-shadow: 2px 2px 5px black;
      transition: all 0.3s ease-in-out;
    }
  }
  .types-And-Moves {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 300px;
    @media screen and (max-width: 619px) {
      margin-bottom: 30px;
    }
  }
  .types {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: #cc0000;
    height: 100px;
    margin-bottom: 20px;
    transition: all 0.3s ease-in-out;
    &:hover {
      box-shadow: 2px 2px 5px black;
      transition: all 0.3s ease-in-out;
    }
    .type-img {
      height: 70px;
    }
  }
  .moves {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 320px;
    background-color: #cc0000;
    padding: 15px 0;
    div {
      flex-grow: 1;
      margin: 0 10px 10px 10px;
      overflow-y: auto;
      /* width */
      ::-webkit-scrollbar {
        width: 15px;
      }
      /* Track */
      ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey;
        border-radius: 10px;
        background-color: #3d7dca;
      }
      /* Handle */
      ::-webkit-scrollbar-thumb {
        background: #ffcb05;
        border-radius: 10px;
      }
    }
    &:hover {
      box-shadow: 2px 2px 5px black;
    }
  }
`;

// -------------------------

export const ProgressBar = styled.div`
  height: 20px;
  width: 90%;
  margin: 0 auto;
  position: relative;
  .label {
    position: relative;
    z-index: 1;
    text-align: center;
    color: #000;
  }
`;

export const BaseBox = styled.div`
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 3px;
  transition: width 0.5s ease-in-out;
`;

export const Background = styled(BaseBox)`
  background: #3d7dca;
  width: 100%;
`;

export const Progress = styled(BaseBox)`
  background: #ffcb05;
  width: ${({ percent }) => percent}%;
`;
