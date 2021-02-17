import styled from "styled-components";

import "../../fonts/fonts.css";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 25px;
  padding: 15px;
  padding-top: 70px;
  .back-btn {
    position: absolute;
    top: 80px;
    left: 10px;
  }
  .battle-btn {
    position: absolute;
    top: 80px;
    right: 10px;
  }
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: default;
    .result-label {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      width: 100%;
      height: 160px;
      border-radius: 10px;
      background-color: rgba(255, 203, 5, 0.8);
      padding: 15px;
      margin-bottom: 20px;
      img {
        margin: auto;
        height: 100%;
        width: 50%;
      }
    }
    p {
      font-size: 25px;
      color: #000;
      text-align: center;
      font-weight: bolder;
      @media screen and (max-width: 424px) {
        font-size: 20px;
      }
    }
    h2 {
      font-family: "PokemonFont";
      color: #ffcb05;
      font-size: 40px;
      text-align: center;
      letter-spacing: 6px;
      -webkit-text-stroke-width: 0.5px;
      -webkit-text-stroke-color: #003a70;
      @media screen and (min-width: 425px) and (max-width: 669px) {
        font-size: 30px;
      }
      @media screen and (max-width: 424px) {
        font-size: 25px;
      }
    }
  }
  .vs-img {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    margin: 20px;
    img {
      width: 100%;
    }
  }
`;

export const PokemonContainer = styled.div`
  select {
    width: 100%;
    height: 2rem;
    background-color: #cc0000;
    color: #ffcb05;
    outline: none;
    border: none;
    font-weight: bold;
    letter-spacing: 2px;
    border-radius: 20px;
    margin-bottom: 5px;
    padding-left: 10px;
  }
`;

export const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 669px) {
    flex-direction: column;
  }
`;

export const CardContainer = styled.div`
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
    @media (max-width: 619px) {
      height: 68px;
      align-items: center;
    }
    h2 {
      font-family: "PokemonFont";
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
