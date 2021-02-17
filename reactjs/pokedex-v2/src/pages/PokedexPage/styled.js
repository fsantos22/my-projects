import styled from "styled-components";

export const PokemonsContainer = styled.div`
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
`;
