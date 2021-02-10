import React from "react";
import styled from "styled-components";
import { MatchListImg, BackMatchListImg } from "./Parameters";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  height: 7vh;

  div {
    display: flex;
    padding: 10px;
    position: relative;
  }

  img {
    position: absolute;
    width: 4vh;
    cursor: pointer;
  }
`;

let LeftIcon = styled.img`
  right: 3%;
  display: initial;
`;
let RightIcon = styled.img`
  left: 3%;
  display: initial;
`;

const LogoName = styled.h3`
  position: absolute;
  top: 1vh;
  left: 50%;
  transform: translate(-50%);
  font-size: 1.5rem;
  color: blueviolet;
  cursor: default;

  span {
    color: purple;
  }
`;

export default function Header(props) {
  if (props.MatchList) {
    LeftIcon = styled.img`
      display: none;
    `;
    RightIcon = styled.img`
      left: 3%;
      display: initial;
    `;
  } else {
    LeftIcon = styled.img`
      right: 3%;
      display: initial;
    `;
    RightIcon = styled.img`
      display: none;
    `;
  }
  return (
    <HeaderContainer>
      <div>
        <LeftIcon src={BackMatchListImg} onClick={props.changePage} alt="Back to Swipe Page Icon" />
        <LogoName>
          astro<span>match</span>
        </LogoName>
        <RightIcon src={MatchListImg} onClick={props.changePage} alt="Go to Match Page Icon" />
      </div>
      <hr />
    </HeaderContainer>
  );
}
