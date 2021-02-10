import React from 'react';
import styled from 'styled-components';
import SwipeLeft from '../imgs/swipe-left.png';
import SwipeRight from "../imgs/swipe-right.png";

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 13vh;

  img {
    width: 10vh;
    height: 10vh;
    cursor: pointer;

    &:hover {
      transform: scale(1.2);
      transition: linear 0.3s;
    }
  }
`;

export default function Footer(props) {
    return (
      <FooterContainer>
        <img src={SwipeLeft} onClick={props.swipeLeft} alt="" />
        <img src={SwipeRight} onClick={props.swipeRight} alt="" />
      </FooterContainer>
    );
}
