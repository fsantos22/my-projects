import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #fff;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 4px 4px 5px -5px;

  textarea {
    display: flex;
    flex-grow: 1;
    outline: none;
    padding: 15px;
    border: grey;
    background-color: #dedede;
    outline: none;
    resize: vertical;
    cursor: default;
    border-radius: 5px;
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
      cursor: pointer;
      max-width: 40px;
      max-height: 40px;
      margin: 0 15px;
    }
  }
`;
