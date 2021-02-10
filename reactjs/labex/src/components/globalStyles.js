import styled from "styled-components";

export const Background = styled.div`
  position: fixed;
  min-width: 100%;
  min-height: 100%;
  z-index: -1;
  background-image: url(${(props) => props.img});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export const InputsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid blue;
  padding: 10px;

  position: absolute;
  top: calc(50% + 40px);
  left: 50%;
  transform: translate(-50%, -50%);

  height: ${(props) => props.height};
  width: 500px;
  max-width: 90vw;
  cursor: default;

  color: #fff;
  text-shadow: 1px 1px #000;
  border: 1px solid #fff;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.5);

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

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

export const Button = styled.button`
  color: #fff;
  background: transparent;
  border: 1px solid #fff;
  outline: none;
  padding: 10px;
  margin: 10px 0;
  font-size: 0.8rem;
  font-weight: bold;
  text-shadow: 1px 1px #000;
  letter-spacing: 1px;
  width: ${(props) => props.width};
  max-width: ${(props) => props.maxWidth};
  transition: all 0.3s ease-in-out;

  cursor: pointer;

  &:hover {
    background-color: #fff;
    color: #000;
    text-shadow: 1px 1px #fff;
    border: 1px solid #000;
    transition: all 0.3s ease-in-out;
  }
`;

export const BackButton = styled.div`
  position: absolute;
  top: 60px;
  left: 10px;
`;

export const TripsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;

  width: 100%;
  max-width: 98vw;

  position: absolute;
  top: 120px;
  left: 50%;
  transform: translate(-50%);
`;

export const SideMenu = styled.div`
  padding: 10px;
  height: calc(100vh - 120px);
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid #fff;
  border-radius: 5px;
  padding: 10px;
  color: #fff;

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    &:hover {
      background-color: rgba(255, 255, 255, 0.8);
      color: #fff;
    }
  }

  h1 {
    font-size: 24px;
    text-align: center;
    margin: 10px 0;
  }

  hr {
    width: 80%;
    margin: 10px;

    background: #fff;
  }

  a {
    text-decoration: none;
    color: #fff;
  }
  ul {
    list-style: none;
  }
  li {
    text-align: center;
    padding: 5px 0;
    margin-bottom: 10px;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const Content = styled.div`
  flex-grow: 1;
  max-width: 98vw;
  padding: 0 5px;

  height: calc(100vh - 120px);
  overflow-y: auto;
`;

export const Icon = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 25px;
    width: 25px;

    color: #fff;
    font-size: 5rem;
    cursor: pointer;

    position: absolute;
    top: 70px;
    right: 15px;
    z-index: 11;
  }
`;

export const DropMenu = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;

    z-index: 10;
    position: absolute;
    top: ${(props) => (props.openMenu ? "60px" : "-100%")};
    right: 0;
    z-index: 10;

    background-color: rgba(0, 0, 0, 0.9);
    color: #fff;
    padding: 10px;
    width: 100%;
    height: 100%;
    height: ${(props) => (props.openMenu ? "100%" : "0")};
    opacity: ${(props) => (props.openMenu ? "1" : "0")};
    transition: all 0.5s ease-in-out;
    cursor: pointer;

    .loading {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
    }

    h1 {
      font-size: 24px;
      text-align: center;
      margin-bottom: 15px;
    }

    hr {
      width: 80%;
      margin: 10px;

      background: #fff;
    }

    a {
      text-decoration: none;
      color: #fff;
    }

    ul {
      list-style: none;
    }

    li {
      text-align: center;
      padding: 5px 0;
      margin-bottom: 10px;
      width: 300vw;
      &:hover {
        background-color: rgba(255, 255, 255, 0.5);
        color: #fff;
      }
    }
  }
`;

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;

  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid #fff;
  border-radius: 5px;
  padding: 10px;
  color: #fff;
  cursor: default;

  opacity: ${(props) => (props.trips > 0 ? "1" : "0")};

  img {
    width: 50%;
    min-width: 280px;
    margin: auto;

    @media screen and (max-width: 320px) {
      min-width: 100%;
    }
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .container {
    display: flex;
    .label {
      min-width: 100px;
    }
  }
  span {
    font-weight: bold;
    color: #dedede;
  }

  h1 {
    font-size: 24px;
    color: #dedede;
    text-align: center;
    margin-bottom: 15px;
  }

  hr {
    margin: 10px auto;
    width: 90%;
    background: #fff;
  }
`;
