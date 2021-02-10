import React, { Component } from 'react';
import styled from "styled-components";
import {
  SearchBar,
  SelectInput,
  RegularInput,
} from "./Styled";
import MenuItem from "@material-ui/core/MenuItem";

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */

  div {
    display: flex;
    gap: 10px;
  }
`;

export class InternalHeader extends Component {

  render() {
    return (
      <div className="header">
        <InputBox id="searchbar">
          <label>Busca</label>
          <SearchBar
            placeholder="Buscar por título ou descrição"
            onChange={this.props.onChangeSearchName}
            variant="outlined"
          />
        </InputBox>

        <InputBox>
          <label>Filtrar valores</label>
          <div>
            <RegularInput
              type="Number"
              min="0"
              onChange={this.props.onChangeMinValue}
              placeholder="De (R$)"
              variant="outlined"
            />
            <RegularInput
              type="Number"
              min="0"
              onChange={this.props.onChangeMaxValue}
              placeholder="Até (R$)"
              variant="outlined"
            />
          </div>
        </InputBox>

        <InputBox>
          <label>Ordem</label>
          <SelectInput
            select
            value={this.props.selectedOrder}
            onChange={this.props.orderType}
            variant="outlined"
          >
            <MenuItem value="asc">Pelo menor valor</MenuItem>
            <MenuItem value="desc">Pelo maior valor</MenuItem>
          </SelectInput>
        </InputBox>
      </div>
    );
  }
}

export default InternalHeader
