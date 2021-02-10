import styled from "styled-components";
import bg from "./imgs/bg2.jpg";

export const PlaylistBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
  border: 2px solid black;
  margin: 5px;
  align-items: center;
  border-radius: 15px;
  background-color: #000000;

  div {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  img {
    width: 100%;
    height: 200px;
  }

  .add-button {
    width: 100%;
    border-radius: 0 0 15px 15px;
    height: 2rem;
    border: 1px solid black;
  }
`;

export const PlaylistsContainer = styled.div`
  /* display: flex;
  flex-wrap: wrap;
  justify-content: center; */
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-content: center;
`;

export const PlayListTracksBox = styled.div`
  position: fixed;
  background-color: rgba(0, 194, 225, 0.9);
  top: 60px;
  padding: 10px;
  max-width: 95vw;
  border-radius: 10px;
`;

export const DeleteButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  font-size: 1.1rem;
  font-weight: bold;
  background-color: red;
  color: white;
  border: 1px solid white;
  border-radius: 50%;
  outline: none;
`;

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-image: url(${bg});
  background-position: center;

  nav {
    width: 100%;
    background-color: black;
    height: 50px;
    display: flex;
    justify-content: space-between;
    padding: 5px;
    align-items: center;
    position: fixed;
    z-index: 1;
    box-shadow: 0px 5px 10px -3px;

    span {
      font-size: 1.5rem;
      font-family: "Teko", sans-serif;
      color: white;
    }

    ul {
      list-style: none;
      display: flex;

      li {
        margin: 5px;
      }

      button {
        padding: 5px;
      }
    }

    .nav-btn {
      border-radius: 5px;
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 5px;
    color: #ffffff;

    h3 {
      color: white;
      font-size: 1.2rem;
    }
  }

  .btn {
    background-color: black;
    color: white;
    outline: none;
    border: none;
  }

  .btn:hover,
  .btn:active {
    background-color: rgb(0, 194, 225);
    transition: linear 0.5s;
  }

  .delete-btn,
  .close-btn {
    height: 30px;
    width: 30px;
    cursor: pointer;
  }

  .logo-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    height: 40px;
    margin-left: 2px;
  }
`;

export const TrackList = styled.div`
  position: relative;
  width: 100%;
  max-height: 60vh;
  overflow-y: auto;

  audio {
    height: 30px;
    margin: 10px 0;
  }

  button {
    width: 20%;
  }

  span {
    font-weight: bold;
  }

  hr {
    margin: 10px 0;
  }

  .player-controls {
    display: flex;
    flex-direction: space-between;
    align-items: center;
    gap: 10px;
  }
`;

export const SessionTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  color: black;
  text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff,
    1px 1px 0 #fff;
  font-weight: bold;
  font-family: "Anton", sans-serif;
  letter-spacing: 5px;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 50px;
  padding: 15px;
  flex-grow: 1;
  overflow-y: auto;

  .home-box {
    max-width: 75vw;

    p {
      position: relative;
      text-align: center;
      margin-top: 60px;
      font-size: 2.5rem;
      width: 90vw;
      font-family: "Yusei Magic", sans-serif;
      text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff,
        1px 1px 0 #fff;
        z-index: 2;
    }

    img {
      position: absolute;
      bottom: 0;
      right: 0;
      max-height: 65vh;
      z-index: 1;
    }
  }
`;

export const Boxes = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  min-width: 300px;
  max-width: 600px;
  margin-top: 60px;
  padding: 15px;
  justify-content: space-between;
  margin: auto;
  font-size: 1.2rem;

  label {
    font-weight: bold;
  }

  input,
  button,
  img {
    outline: none;
  }

  input {
    padding: 5px 10px;
  }

  input,
  select {
    border-radius: 20px;
    border: 1px solid black;
    min-width: 150px;
    font-size: 1.2rem;
  }

  .create-input {
    width: 95%;
    align-self: center;
    height: 2rem;
    padding: 15px;
    margin: 10px 0;
  }

  .main-btn {
    margin: 10px;
    height: 2rem;
    border-radius: 10px;
    border: 1px solid black;
  }

  .inputs {
    div {
      display: grid;
      grid-template-columns: 40% 60%;
      padding: 5px 15px;
    }
  }
`;
