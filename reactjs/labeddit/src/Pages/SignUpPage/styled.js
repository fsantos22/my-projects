import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 40vw;
  min-width: 300px;

  display: flex;
  flex-direction: column;

  background-color: #fff;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 4px 4px 5px -5px;

  h2 {
    text-align: center;
    margin-bottom: 25px;
    color: #ff4500;
  }

  p {
    margin: 10px auto;
  }

  a {
    font-weight: bold;
    &:visited {
      color: grey;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;

    input,
    button {
      height: 2rem;
      padding: 0 10px;
      border-radius: 5px;
      outline: none;
    }

    input {
      border: 1px solid #dedede;
      cursor: default;
    }

    button {
      background-color: #fff;
      border: 1px solid #fff;
      transition: all 0.3s ease-in-out;
      background-color: #ff4500;
      color: #fff;
      font-weight: bold;
      cursor: pointer;
      &:hover {
        background-color: #fff;
        border: 1px solid #ff4500;
        color: #ff4500;
        transition: all 0.3s ease-in-out;
      }
    }
  }
`;
