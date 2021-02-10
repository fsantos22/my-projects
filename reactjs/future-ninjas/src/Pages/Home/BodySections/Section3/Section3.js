import React from "react";
import styled from "styled-components";
import "../../../../components/Fonts/SourceSans/SourceSansPro_Light.css";
import {Cards} from "./Cards";
import {
  HomeDivContainer,
  HomeDivContent2,
  HomeMainTitle2,
  HomeSubtitle2,
} from "../../../../components/Styled";

const DivCard = styled.div`
  display: flex;
  flex-wrap:wrap;
  justify-content: space-around;
  width: 100%;
`;

export const Section3 = () => {
  return (
    <HomeDivContainer>
      <HomeDivContent2>
        <div>
          <HomeMainTitle2>O que é o Future Ninjas?</HomeMainTitle2>
          <HomeSubtitle2>
            Future Ninjas é uma plataforma de contratação de serviços online.
            Conectamos Profissionais de todo o Brasil com pessoas solicitando
            serviço, atendendo com qualidade, facilidade e rapidez todos os
            tipos de necessidade.
          </HomeSubtitle2>
          <br/><br/>
          <HomeMainTitle2>Como funciona?</HomeMainTitle2>
        </div>
        <DivCard>
          <Cards
            image="https://www.icontalent.com.br/wp-content/uploads//2020/08/Icon-The-One.svg"
            title="Publique uma vaga"
            subtitle="Publique uma vaga. Publique a sua vaga para milhares de profissionais, você irá receber propostas de freelancers talentosos em poucos minutos."
          />
          <Cards
            image="https://www.icontalent.com.br/wp-content/uploads//2020/08/Icon-Chegada.svg"
            title="Contrate"
            subtitle="Reveja o histórico de trabalho, feedback de clientes e portfólio para limitar os candidatos. Então faça uma entrevista pelo chat e escolha o melhor."
          />
          <Cards
            image="https://www.icontalent.com.br/wp-content/uploads//2020/08/Icon-Three.svg"
            title="Pague com segurança"
            subtitle="Com o pagamento seguro do 99Freelas, o pagamento será repassado para o freelancer somente quando o projeto estiver concluído."
          />
        </DivCard>
      </HomeDivContent2>
    </HomeDivContainer>
  );
};
