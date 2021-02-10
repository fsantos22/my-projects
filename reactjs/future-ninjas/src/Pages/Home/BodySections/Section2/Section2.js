import React from "react";
import styled from "styled-components";
import "../../../../components/Fonts/SourceSans/SourceSansPro_Light.css";
import {
  HomeDivContainer,
  HomeDivImage,
  HomeDivMargin,
  HomeImage,
} from "../../../../components/Styled";

const DivContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
`;

const MainTitle = styled.p`
  font-family: "Source Sans Pro", Helvetica, Arial, sans-serif;
  font-size: 48px;
  line-height: 56px;
  margin: 5px;
`;

const Subtitle = styled.p`
  font-family: "Source Sans Pro", Helvetica, Arial, sans-serif;
  color: #575757;
  font-size: 24px;
  font-weight: 800;
  margin: 5px;
  line-height: 32px;
  word-break: break-all;
`;

export const Section2 = () => {
  return (
    <HomeDivContainer>
      <DivContent>
        <HomeDivMargin>
          <MainTitle>2.800.000</MainTitle>
          <Subtitle>
            Serviços solicitados por ano, de Arquiteto à Professor de Francês.
          </Subtitle>
        </HomeDivMargin>
        <HomeDivMargin>
          <MainTitle>240.000</MainTitle>
          <Subtitle>
            Clientes felizes por mês, com serviços contratados pelo Future
            Ninjas.
          </Subtitle>
        </HomeDivMargin>
        <HomeDivMargin>
          <MainTitle>R$ 450.000.000</MainTitle>
          <Subtitle>
            Valor em serviços por ano, no bolso dos nossos profissionais.
          </Subtitle>
        </HomeDivMargin>
      </DivContent>
      <HomeDivImage>
        <HomeImage src="https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1573496799515-eebbb63814f2%3Fixlib%3Drb-1.2.1%26q%3D80%26fm%3Djpg%26crop%3Dentropy%26cs%3Dtinysrgb%26w%3D1080%26fit%3Dmax" />
      </HomeDivImage>
    </HomeDivContainer>
  );
};
