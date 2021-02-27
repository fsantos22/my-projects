import React from 'react'
import { VideoBg, VideoContainer, Main } from './styled';
import video from "../../videos/home.mp4"
import homelogo from "../../images/home-logo.png"
import { Link } from 'react-router-dom';

const Home = () => {
    return (
      <>
        <VideoContainer>
          <VideoBg autoPlay loop muted src={video} type="video/mp4" />
        </VideoContainer>
        <Main>
          <h2>Mantenha-se sempre bem informado</h2>
          <div>
            <Link to="/login">
              <img src={homelogo} alt="" />
            </Link>
          </div>
        </Main>
      </>
    );
}

export default Home
