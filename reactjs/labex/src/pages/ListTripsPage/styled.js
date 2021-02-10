import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-top: 25px;

  position: relative;
  left: 50%;
  transform: translate(-50%);

  width: 600px;
  max-width: 90%;

  color: #fff;
  text-shadow: 1px 1px #000;
  border: 1px solid #fff;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.5);

  h1 {
    font-size: 24px;
    text-align: center;
  }

  hr {
    width: 80%;
    margin: 10px;

    background: #fff;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 100%;

    input,
    select,
    textarea {
      padding: 0 5px;
      margin: 5px 0;
      width: 100%;
      border: 1px solid #000;
      border-radius: 5px;
      outline: none;
    }

    input,
    select {
      height: 2rem;
    }

    div {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
    }
  }
`;

export const LoadingBox = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

