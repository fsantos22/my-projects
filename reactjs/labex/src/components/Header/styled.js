import styled from "styled-components";
import "../../fonts/fonts.css";

export const HeaderContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  transition: top 0.3s;
  z-index: 10;

  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: default;

  height: 60px;
  width: 100vw;
  padding: 10px;
  color: #fff;
  background-color: #000;
  box-shadow: 0px 5px 8px -4px #000;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% - 200px);
    height: 100%;
    h2 {
      font-family: "LogoFont";
      text-align: center;
      font-size: 3vw;
      color: #dedede;
    }
  }

  span {
    color: #fff;
    font-family: "LogoFont";
    font-size: 20px;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    h2 {
      font-size: 14px;
    }
  }
`;
