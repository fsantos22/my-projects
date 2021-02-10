import React from "react";
import styled from "styled-components";
import bgCart from "../../imgs/bg-cart.png";

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 10vw;
  min-width: 200px;
  border: 1px solid black;
  padding: 10px;
  background-color: #ffffff;
  background-image: url(${bgCart});
  position: absolute;
  right: 10px;
  top: 55px;
  border-radius: 15px;

  h3 {
    margin-bottom: 10px;
    background-color: #ffffff;
  }

  p {
    background-color: #ffffff;
  }

  .cleanBtn {
    background-color: #000000;
    color: #ffffff;
    height: 35px;
    border-radius: 5px;
  }

  .cleanBtn:hover {
    background-color: orange;
    transition: ease 0.3s;
  }
`;

const CartItem = styled.div`
  border-bottom: 1px dashed black;
  display: flex;
  justify-content: space-between;

  .changeQuantityBtn {
    width: 15px;
    background-color: #000000;
    color: #ffffff;
    outline: none;
    border: 2px solid grey;
    margin: 0 6px;
  }
`;

const DeleteBtn = styled.button`
    padding: 3px;
    background-color: #ffffff;
    border: none;
    outline: none;
    font-weight: bold;
`;

export const Cart = (props) => {
  let name = props.cart.map((item) => {
    return (
      <CartItem key={item.id}>
        <p>
          <button
            className="changeQuantityBtn"
            onClick={() => props.onClickAddItem(item)}
          >
            +
          </button>
          {item.quantity}
          <button
            className="changeQuantityBtn"
            onClick={() => props.onClickRemoveItem(item)}
          >
            -
          </button>
          {" "}
          {item.name}
        </p>
        <DeleteBtn onClick={() => props.onClickDelete(item)}>
          [ X ]
        </DeleteBtn>
      </CartItem>
    );
  });

  return (
    <CartContainer>
      <h3>Carrinho:</h3>
      {name}
      <p>Total: R${props.totalValue.toFixed(2)}</p>
      <button className="cleanBtn" onClick={props.cleanCart}>Limpar carrinho</button>
    </CartContainer>
  );
};
