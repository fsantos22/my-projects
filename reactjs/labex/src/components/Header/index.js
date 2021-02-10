import React from "react";

import { useHistory } from "react-router-dom";
import { goToHomePage, goToLoginPage, goToAdminPage } from "../../pages/Routes/Coordinator";

import { HeaderContainer } from "./styled";
import { Button } from "../globalStyles";

const Header = (props) => {
  const history = useHistory();

  // From W3 Schools
  /* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
  let prevScrollpos = window.pageYOffset;
  window.onscroll = function () {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById("navbar").style.top = "0";
    } else {
      document.getElementById("navbar").style.top = "-60px";
    }
    prevScrollpos = currentScrollPos;
  };

  const logout = () => {
    localStorage.removeItem("token");
    props.toggle();
    history.push("/");
  };

  return (
    <HeaderContainer id="navbar">
      {props.logged ? (
        <span onClick={() => goToAdminPage(history)}>LabeX</span>
      ) : (
        <span onClick={() => goToHomePage(history)}>LabeX</span>
      )}
      {props.logged && (
        <div>
          <h2>Área do Administrador</h2>
        </div>
      )}
      {props.logged ? (
        <Button onClick={logout}>LOGOUT</Button>
      ) : (
        <Button onClick={() => goToLoginPage(history)}>LOGIN</Button>
      )}
    </HeaderContainer>
  );
};

export default Header;
