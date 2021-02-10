import React from "react";
import styled from "styled-components";
import axios from "axios";
import Home from "./Home";
import { baseUrl, user } from "./components/Parameters";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 6vh;
`;

const Button = styled.button`
  position: absolute;
  top: 3px;
  left: 50%;
  transform: translate(-50%);
  height: 30px;
  width: 150px;
  background-color: #fff;
  color: #000;
  font-weight: bold;
  border: 1px solid #000;
  border-radius: 10px;
  &:hover {
    background-color: #000;
    color: #fff;
    transition: linear 0.5s;
  }
`;

export default function App() {
  const clearMacthes = () => {
    axios
      .put(`${baseUrl}/${user}/clear`)
      .then(alert("Sua lista de macthes foi limpa!"))
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Button onClick={clearMacthes}>Limpar matches</Button>
      <Wrapper>
        <Home user={user} />
      </Wrapper>
    </>
  );
}
