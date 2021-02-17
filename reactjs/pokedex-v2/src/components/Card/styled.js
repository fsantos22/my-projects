import styled from "styled-components";

import "../../fonts/fonts.css";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  cursor: default;

  width: 250px;
  height: 350px;
  border: 1px solid black;
  color: #000;
  box-shadow: 5px 5px 6px -3px #000;
  border-radius: 5px;

  .label-container {
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #cc0000;
    white-space: nowrap;
    overflow-x: hidden;
    overflow-y: hidden;
    border-radius: 5px 5px 0 0;

    @media (max-width: 619px) {
      height: 52px;
      align-items: center;
    }

    h2 {
      font-family: "PokemonFont";
      margin-top: -10px;
      color: #ffcb05;
      font-size: 22px;
      text-align: center;
      letter-spacing: 4px;
      -webkit-text-stroke-width: 0.5px;
      -webkit-text-stroke-color: #003a70;
    }
  }

  .img-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    background-color: #3d7dca;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  .cards-btn-container {
    display: flex;
  }
`;
