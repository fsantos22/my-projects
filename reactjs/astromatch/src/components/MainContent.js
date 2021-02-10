import React from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  width: 90%;
  height: 50vh;
  border-radius: 5px;
  box-shadow: 1px 1px 10px;
  margin: 15px auto;
  position: relative;
  cursor: default;

  .text-box {
    position: absolute;
    bottom: 0;
    z-index: 2;

    span {
      font-weight: 800;
      font-size: 2rem;
    }

    p {
      padding: 0 10px;
      font-weight: 500;
      color: white;
      text-shadow: 1px 1px 2px #000;
    }

    p:nth-child(1) {
      font-size: 1.5rem;
      padding-bottom: 5px;
    }
    p:nth-child(2) {
      font-size: 1rem;
      padding-bottom: 15px;
      text-align: justify;
      word-break: break-word;
    }
  }

  .profile-photo {
    position: absolute;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
`;

export default function MainContent(props) {
  return (
    <MainContainer>
      <div className="text-box">
        <p>
          <span>{props.profile.name},</span> {props.profile.age}
        </p>
        <p>{props.profile.bio}</p>
      </div>
      <img
        className="profile-photo"
        src={props.profile.photo}
        alt="profile-photo"
      />
    </MainContainer>
  );
}
