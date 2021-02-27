import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px;
  gap: 15px;

  #back-button {
    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid #fff;
    border-radius: 5px;
    background-color: #ff4500;
    padding: 15px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    height: 30px;
    width: 120px;
    font-size: 1.2rem;
    color: #fff;

    &:hover {
      background-color: #fff;
      color: #ff4500;
      border: 1px solid #ff4500;
      transition: all 0.3s ease-in-out;
    }
    span {
      font-size: 1rem;
      font-weight: bold;
      padding-left: 10px;
      letter-spacing: 3px;
    }
  }
`;
