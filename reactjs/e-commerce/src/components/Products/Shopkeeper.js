import React from "react";
import styled from "styled-components";
import { HeaderField } from "./HeaderField";

const Wrapper = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  margin: auto;
`;

const Container = styled.section`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 2px solid black;
  height: 50vh;
  width: 50vh;
  margin-top: 25vh;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    width: 50%;
  }

  button {
    background-color: #000000;
    color: #ffffff;
    height: 35px;
    border-radius: 5px;
  }

  button:hover {
    background-color: orange;
    transition: ease 0.3s;
  }
`;

export const Shopkeeper = (props) => {
  return (
    <Wrapper>
      <Container>
        <HeaderField
          Modo={props.Modo}
          ChangeModeStatus={props.ChangeModeStatus}
          quantity={props.quantity}
          orderType={props.orderType}
        />
        <div>
          <label>Nome do Produto</label>
          <input
            type="text"
            value={props.inputName}
            onChange={props.onChangeProductName}
          />
        </div>
        <div>
          <label>Preço (R$)</label>
          <input
            type="number"
            min={0}
            step=".01"
            value={props.inputValue}
            onChange={props.onChangeProductValue}
          />
        </div>
        <div>
          <label>Link da Imagem</label>
          <input
            type="text"
            value={props.inputImage}
            onChange={props.onChangeProductImage}
          />
          <img src={props.inputImage} alt="" />
        </div>
        <button onClick={props.addProduct}>Cadastrar Produto</button>
      </Container>
    </Wrapper>
  );
};
