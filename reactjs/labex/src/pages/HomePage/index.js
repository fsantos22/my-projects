import React, {useEffect} from "react";
import { useHistory } from "react-router-dom";
import bg from "../../images/homeBG.jpg";

import { Background } from "../../components/globalStyles";
import { goToListTripsPage } from "./../Routes/Coordinator";
import { TextBox } from "./styled";
import { Button } from "./../../components/globalStyles";

const HomePage = () => {
  const history = useHistory();

  return (
    <>
      <Background img={bg} />

      <TextBox>
        <h1>Conheça a LabeX</h1>
        <hr/>
        <p>
          Somos capazes de proporcionar uma experiência única, expandido seus
          horizontes e redefinindo o conceito de limite. A Terra é pequena
          demais para nós e também pode ser pros seus sonhos. Aventure-se em um
          novo planeta e descubra as belezas do Universo.
        </p>
        <Button width="80%" maxWidth="500px" onClick={() => goToListTripsPage(history)}>
          DESTINOS DISPONÍVEIS
        </Button>
      </TextBox>
    </>
  );
};

export default HomePage;
