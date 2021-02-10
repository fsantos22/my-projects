import React from "react";
import { useHistory } from "react-router-dom";

import { AdminMenuContainer } from "./styled";

import { useProtectedPage } from "./../../components/hooks/useProtectedPage";
import { goToTripDetailsPage } from "../Routes/Coordinator";
import { goToCreateTripPage } from "./../Routes/Coordinator";
import { Button } from "./../../components/globalStyles";

const AdminMenu = () => {
  useProtectedPage();
  const history = useHistory();

  return (
    <AdminMenuContainer>
      <Button width="100%" onClick={() => goToCreateTripPage(history)}>
        CRIAR VIAGEM
      </Button>
      <Button
        width="100%"
        marginTop="10px"
        onClick={() => goToTripDetailsPage(history)}
      >
        VER CANDIDATURAS
      </Button>
    </AdminMenuContainer>
  );
};

export default AdminMenu;
