import styled from "styled-components";

export const Container = styled.div`
  margin-top: 10px;
  width: 100%;
  background-color: #fff;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 4px 4px 5px -5px;
  form {
    display: flex;
    align-items: center;
    gap: 25px;
  }

  .inputs-container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  input,
  textarea {
    border: grey;
    background-color: #dedede;
    outline: none;
    padding: 10px;
  }

  input {
    border-radius: 5px 5px 0 0;
  }
  textarea {
    border-radius: 0 0 5px 5px;
    resize: vertical;
  }

  #send-icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease-in-out;
    &:hover {
      img {
        transform: rotate(-360deg);
        transition: all 0.3s ease-in-out;
      }
      p {
        opacity: 1;
        transition: all 0.3s ease-in-out;
      }
    }

    cursor: pointer;
    p {
      text-align: center;
      opacity: 0;
      transition: all 0.3s ease-in-out;
    }
    img {
      width: 80%;
      max-width: 50px;
      transition: all 0.3s ease-in-out;
    }
  }
`;
