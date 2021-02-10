import React from "react";
import styled from "styled-components";

let FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #000000;
  color: #ffffff;
  position: absolute;
  top: 38px;

  label {
    margin-top: 10px;
  }

  input {
    width: 120px;
  }

`;

export const Filter = (props) => {
  return (
    <>
      <FilterContainer>
        <h3>Filtros:</h3>
        <label> Valor mínimo</label>
        <input
          onChange={(event) => props.minValue(event)}
          type="number"
          min={0}
          step=".01"
          value={props.minFilterValue}
        />
        <label> Valor máximo</label>
        <input
          onChange={(event) => props.maxValue(event)}
          type="number"
          step=".01"
          value={props.maxFilterValue}
        />
        <label> Busca por nome</label>
        <input
          onChange={(event) => props.changeSearchName(event)}
          type="text"
        />
      </FilterContainer>
    </>
  );
};
