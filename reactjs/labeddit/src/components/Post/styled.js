import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid #dedede;
  border-radius: 5px;
  width: 100%;
  background-color: #fff;
  cursor: default;
  transition: all 0.3s ease-in-out;
  box-shadow: 4px 4px 5px -5px;
  &:hover {
    transform: scale(1.01);
    transition: all 0.3s ease-in-out;
  }

  div {
    padding: 15px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;

    #user {
      background-color: #ff4500;
      color: #fff;
      font-weight: bold;
      padding: 10px;
      border-radius: 20px;
    }

    #date {
      color: grey;
      font-size: 12px;
      font-weight: bold;
    }
  }

  .main {
    cursor: pointer;
    h3 {
      margin-bottom: 10px;
    }
    text-align: justify;
    hyphens: auto;
    overflow-wrap: break-word;
  }

  .vote {
    display: flex;
    gap: 10px;
    cursor: default;

    #arrow-up {
      font-size: 20px;
      color: ${(props) => props.color};
      cursor: pointer;
      &:hover {
        color: blue;
      }
    }
    #arrow-down {
      font-size: 20px;
      color: ${(props) => props.color};
      cursor: pointer;
      &:hover {
        color: red;
      }
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    padding: 5px 15px;

    color: grey;
    font-size: 14px;
    font-weight: bold;

    span {
      color: #000;
    }
  }
`;
