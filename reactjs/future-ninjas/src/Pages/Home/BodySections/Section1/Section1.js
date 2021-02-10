import React from "react";
import "../../../../components/Fonts/SourceSans/SourceSansPro_Light.css";
import ButtonContinue from "./Button";
import GradeIcon from "@material-ui/icons/Grade";
import {
  HomeDivContainer,
  HomeDivContent,
  HomeMainTitle,
  HomeSubtitle,
  HomeDivInputButton,
  HomeInputMaterial,
  HomeDivFooterContents,
  HomeVerifiedUserIconPer,
  HomePSloganFooter,
  HomeDivRating,
  HomeDivImage,
  HomeImage,
} from "../../../../components/Styled";

export const Section1 = () => {
  return (
    <HomeDivContainer>
      <HomeDivContent>
        <HomeMainTitle>
          O jeito mais esperto de contratar um serviço
        </HomeMainTitle>
        <HomeSubtitle>
          Fale o que precisa, receba orçamentos e escolha o melhor.
        </HomeSubtitle>
        <HomeDivInputButton>
          <HomeInputMaterial
            id="outlined-basic"
            label="Digite aqui o que você precisa"
            variant="outlined"
          />
          <ButtonContinue />
        </HomeDivInputButton>
        <HomeDivFooterContents>
          <div className="container">
            <HomeVerifiedUserIconPer />
            <HomePSloganFooter>Orçamento gŕatis e seguro</HomePSloganFooter>
          </div>
          <div className="container">
            <HomeDivRating>
              <GradeIcon />
              <GradeIcon />
              <GradeIcon />
              <GradeIcon />
              <GradeIcon />
            </HomeDivRating>
            <HomePSloganFooter>Profissionais avaliados</HomePSloganFooter>
          </div>
        </HomeDivFooterContents>
      </HomeDivContent>
      <HomeDivImage>
        <HomeImage src="https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1560846389-e4e6d764cd61%3Fixlib%3Drb-1.2.1%26q%3D80%26fm%3Djpg%26crop%3Dentropy%26cs%3Dtinysrgb%26w%3D1080%26fit%3Dmax" />
      </HomeDivImage>
    </HomeDivContainer>
  );
};
