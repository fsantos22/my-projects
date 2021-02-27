import styled from "styled-components";

export const Wrapper = styled.nav`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 20px;
  gap: 20px;
  background-color: #ff4500;
  border: 1px solid #000;
  box-shadow: 0px 8px 4px -8px;

  @media screen and (max-width: 599px) {
    min-height: 100px;
  }

  .logo-container {
    cursor: pointer;
    img {
      height: 40px;
    }
    p {
      font-family: "Exo 2", sans-serif;
      font-size: 26px;
      color: #fff;
    }
  }

  input {
    height: 2rem;
    border-radius: 20px;
    outline: none;
    border: none;
    padding: 0 45px 0 15px;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 20px;
  }

  .mobile-input-container {
    display: none;
    @media screen and (max-width: 599px) {
      display: flex;
      align-items: center;
      width: 100%;
      input {
        width: 100%;
      }
      button {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: 1px solid #ff4500;
        background-color: #fff;
        color: #ff4500;
        outline: none;
        margin-left: 10px;
        height: 32px;
        width: 32px;
        font-size: 1.5rem;
      }
      #clear {
        cursor: pointer;
        position: absolute;
        right: 75px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: red;
        color: #fff;
        font-weight: bold;
        font-size: 12px;
        border-radius: 50%;
        width: 20px;
        height: 20px;
      }
    }
  }

  .input-container {
    display: flex;
    align-items: center;
    justify-content: center;

    flex-grow: 1;
    input {
      width: 100%;
    }
    button {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      border: 1px solid #ff4500;
      background-color: #fff;
      color: #ff4500;
      outline: none;
      margin-left: 10px;
      height: 32px;
      width: 32px;
      font-size: 1.2rem;
    }
    #clear {
      cursor: pointer;
      position: absolute;
      right: 135px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: red;
      color: #fff;
      font-weight: bold;
      font-size: 12px;
      border-radius: 50%;
      width: 20px;
      height: 20px;
    }
    @media screen and (max-width: 599px) {
      display: none;
    }
  }

  .button-container {
    img {
      height: 40px;
      cursor: pointer;
    }
  }
`;
