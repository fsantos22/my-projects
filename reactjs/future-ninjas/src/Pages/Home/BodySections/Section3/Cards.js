import React from "react";
import styled from "styled-components";
import "../../../../components/Fonts/SourceSans/SourceSansPro_Light.css";

const DivContent = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  width: 30vw;
  margin: 30px 10px;
  padding: 10px;
  background-color: #8661d6;
  border-radius: 5px;
  box-shadow: 5px 5px 10px -5px;
  text-align: center;

  &:hover {
    transform: scale(1.1);
    transition: ease 0.5s;
  }
`;

const DivImage = styled.div`
  display: flex;
  width: 100%;
  height: 300px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const MainTitle = styled.p`
  font-family: "Source Sans Pro", Helvetica, Arial, sans-serif;
  font-size: 30px;
  font-weight: bold;
  line-height: 56px;
  text-align: center;
  padding: 20px 0;
  color: #f5f3fc;
`;
const Subtitle = styled.p`
  font-family: "Source Sans Pro", Helvetica, Arial, sans-serif;
  color: #f5f3fc;
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  text-align: justify;
`;

export const Cards = (props) => {
  return (
    <DivContent>
      <DivImage>
        <Image src={props.image} />
      </DivImage>
      <MainTitle>{props.title}</MainTitle>
      <Subtitle>{props.subtitle}</Subtitle>
    </DivContent>
  );
};
