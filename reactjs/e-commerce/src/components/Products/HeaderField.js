import React from "react";
import styled from "styled-components";

const ProductHeader = styled.section`
  display: flex;
  padding: 10px;
  background-color: #000000;
  color: #ffffff;
  align-items: center;

  p {
    margin: ${(props) => props.HeaderMargin};
    width: 50%;
  }

  button {
    background-color: #000000;
    color: #ffffff;
    height: 35px;
    width: 100px;
    border-radius: 5px;
    margin: 0 10px;
  }

  button:hover {
    background-color: orange;
    transition: ease 0.3s;
  }

  @media (max-width: 409px) {
    flex-direction: row;
    /* margin-left: 120px; */
    align-items: center;

    p {
      margin: 0;
      display: ${props => props.pDisplay};
    }
  }
`;
export class HeaderField extends React.Component {
  render() {
    let Modo;
    if (this.props.Modo) {
      Modo = "Modo cliente";
      return (
        <ProductHeader>
          <p>Total: {this.props.quantity} itens</p>
          <button onClick={this.props.ChangeModeStatus}>{Modo}</button>
        </ProductHeader>
      );
    } else {
      Modo = "Modo lojista";
      return (
        <ProductHeader pDisplay={"none"}>
          <p>Total: {this.props.quantity} itens</p>
          <button onClick={this.props.ChangeModeStatus}>{Modo}</button>
          <select onChange={this.props.orderType}>
            <option value="a-z">Ordem crescente</option>
            <option value="z-a">Ordem decrescente</option>
          </select>
        </ProductHeader>
      );
    }
  }
}
