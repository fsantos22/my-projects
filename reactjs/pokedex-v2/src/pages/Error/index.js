import React from 'react'
import errorImg from "../../images/error.jpg"
import { Wrapper } from './../BattlePage/styled';
import { Background } from './../../components/GlobalStyleds/GlobalStyleds';
import white from "../../images/white.jpg"


const Error = () => {
    return (
      <>
        <Background image={white} />
        <Wrapper>
          <img src={errorImg} />
        </Wrapper>
      </>
    );
}

export default Error
