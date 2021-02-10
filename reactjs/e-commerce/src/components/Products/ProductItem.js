import React from 'react'
import styled from "styled-components";

const ProductBox = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 250px;
  background-color: rgb(150, 200, 190);
  border-radius: 5px;

  img {
    border-radius: 5px 5px 0 0;
    width: 250px;;
    height: 250px;
  }

  p {
    padding: 5px;
  }

  .product-name {
    font-weight: bold;
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

export const ProductItem = (props) => {
    return (
      <ProductBox>
        <img src={props.imageUrl} alt="" />
        <p className="product-name">{props.name}</p>
        <p>
          <b>R$</b> {props.value}
        </p>
        <button onClick={props.addToCart}>Adicionar ao carrinho</button>
      </ProductBox>
    );
}
