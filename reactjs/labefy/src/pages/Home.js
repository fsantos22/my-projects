import React from 'react'
import {MainContainer} from "../Styled"
import HomeImg from "../imgs/home-img.png"

export const Home = () => {
    return (
      <MainContainer>
        <div className="home-box">
          <p>Ouça tudo em um só lugar</p>
          <img src={HomeImg} alt="" />
        </div>
      </MainContainer>
    );
}
