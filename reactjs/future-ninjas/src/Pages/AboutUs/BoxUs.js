import React from "react";
import logo from "../../components/images/logo.png";
import { AboutUsSection1 } from './../../components/Styled';


export const BoxUs = () => {
  return (
      <AboutUsSection1>
        <p>
          Bem-vindo ao Future Ninjas, sua fonte número um para tod@s so que
          procuram um Job. <br /> <br />
          Estamos empenhados em fornecer a você o melhor de um ambiente para
          freelas, com ênfase em ligar freela a empregador, processo ágil, sem
          burocracia. <br /> <br />
          Se você tiver alguma dúvida ou comentário, não hesite em nos contatar.
        </p>

        <img src={logo} className="logoStyled" alt="" />
      </AboutUsSection1>
  );
};
