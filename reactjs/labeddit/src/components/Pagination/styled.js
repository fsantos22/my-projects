import styled from 'styled-components'

export const Nav = styled.nav`
  width: 100%;
  padding: 15px;
  margin: 15px 0;

  color: #ffcb05;
  border-radius: 5px;
  box-shadow: 4px 4px 5px -5px #000;
  background-color: #fff;
  cursor: default;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  .info {
    .main {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    display: flex;
    justify-content: center;
    align-items: center;
    input {
      width: 40px;
      margin: 0 5px;
      outline: none;
      border: none;
      height: 2rem;
      padding: 5px;
      border-radius: 5px;
      background-color: #dedede;
      text-align: center;
    }
  }

  button {
    height: 30px;
    width: 30px;
    margin: 0 5px;
    background-color: #ff4500;
    font-weight: bold;
    font-size: 14px;
    color: #fff;
    letter-spacing: 1px;
    border: none;
    border-radius: 50%;

    outline: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      color: #ff4500;
      background-color: #fff;
      border: 1px solid #ff4500;
      transition: all 0.3s ease-in-out;
    }
  }

  .arrow {
    color: #ff4500;
    font-size: 1.5rem;
    height: 30px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  p {
    color: #ff4500;
    font-weight: bold;
  }
`;