import React from "react";
import styled from "styled-components";

const Card = styled.div`
  border: 1px solid #000000;
  margin: 10px;
  display: flex;
  flex-direction: column;
  width: 250px;
  height: fit-content;
  align-items: center;
  background-color: white;
  box-shadow: 2px 2px 5px -2px black;
  position: relative;
  cursor: pointer;

  :hover {
    transform: scale(1.1);
    transition: ease 0.5s;
  }

  img {
    width: 80%;
  }

  div {
    background-color: #000000;
    color: #ffffff;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  p {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #d6d6d6;
    font-weight: bold;
    width: 100%;
    height: 2rem;
  }
`;

export class PokemonCard extends React.Component {
  render() {
    return (
      <Card onClick={this.props.openDetails}>
        <div>{this.props.id}</div>
        <img src={this.props.imgUrl} alt="" />
        <p>{this.props.name}</p>
      </Card>
    );
  }
}
