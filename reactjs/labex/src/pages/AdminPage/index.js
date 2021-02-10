import React from "react";
import { useHistory } from "react-router-dom";

import { Container } from "./styled";

import { useProtectedPage } from "./../../components/hooks/useProtectedPage";
import { goToTripDetailsPage } from "../Routes/Coordinator";
import { goToCreateTripPage } from "./../Routes/Coordinator";
import { Background, Button } from './../../components/globalStyles';

import bg from "../../images/standardBG.jpg";

const AdminPage = () => {
  useProtectedPage();
  const history = useHistory();

  return (
    <>
      <Background img={bg} />
      <Container>
        <Button width="100%" onClick={() => goToCreateTripPage(history)}>
          CRIAR VIAGEM
        </Button>
        <Button width="100%" onClick={() => goToTripDetailsPage(history)}>
          VER CANDIDATURAS
        </Button>
      </Container>
    </>
  );
};

export default AdminPage;
