import styled from 'styled-components'

export const Nav = styled.nav`
  width: 100%;
  padding: 15px;
  margin: 15px 0;

  color: #ffcb05;
  border-radius: 10px;
  background-color: rgba(255, 203, 5, 0.8);
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
      border-radius: 10px;
    }
  }

  button {
    height: 30px;
    width: 30px;
    margin: 0 5px;
    background-color: #cc0000;
    font-weight: bold;
    font-size: 14px;
    color: #ffcb05;
    letter-spacing: 1px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 10px;

    outline: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      color: #cc0000;
      background-color: #ffcb05;
      transition: all 0.3s ease-in-out;
    }
  }

  .arrow {
    color: #cc0000;
    font-size: 1.5rem;
    height: 30px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
      color: #3d7dca;
      transition: all 0.3s ease-in-out;
    }
  }

  p {
    color: #cc0000;
    font-weight: bold;
  }
`;