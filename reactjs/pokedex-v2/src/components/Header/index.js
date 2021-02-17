import React from "react";
import { useHistory } from "react-router-dom";
import { goToPage } from "../../router/Coordinator";

import { Wrapper } from "./styled";
import headerLogo from "../../images/header-logo.png";

export default function Header() {
  const history = useHistory();

  return (
    <Wrapper>
      <div
        className="pokedex-btn"
        onClick={() => goToPage(history, "/pokedex")}
      >
        <img src={headerLogo} alt="pokedex button" />
      </div>
      <div className="title" onClick={() => goToPage(history, "/")}>
        <h2>Pokepédia</h2>
      </div>
    </Wrapper>
  );
}
