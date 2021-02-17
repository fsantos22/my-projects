import styled from "styled-components";
import "../../fonts/fonts.css";

export const Wrapper = styled.div`
  position: fixed;
  z-index: 999;
  cursor: default;

  top: 0;
  left: 0;
  width: 100vw;
  height: 70px;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  padding: 10px;
  background-color: #cc0000;
  box-shadow: 0px 4px 8px -6px;

  @media(max-width: 619px){
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }

  .pokedex-btn {
    height: 42px;
    width: fit-content;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    @media(max-width: 619px){
      height: 100%;

    }
    &:hover {
      transform: scale(1.05);
      transition: all 0.2s ease-in-out;
      background-color: rgba(255, 203, 5, 0.9);
    }

    img {
      height: 100%;
    }
  }

  .back-btn{
    width: 100px;
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    margin-top: -25px;
    width: 100%;

    @media(max-width: 619px){
      height: 100%;
      margin-top: 0;
      align-items: flex-end;
    }
    h2 {
      font-family: "PokemonFont";
      font-size: 28px;
      letter-spacing: 3px;

      color: #ffcb05;
      -webkit-text-stroke-width: 0.5px;
      -webkit-text-stroke-color: #003a70;

      @media(max-width: 619px){
        font-size: 25px;
      }
    }
  }
`;
