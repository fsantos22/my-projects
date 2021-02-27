import React, {useState} from "react";
import { Wrapper } from "./styled";
import { useHistory } from "react-router-dom";
import { goToPage } from "./../../routes/Coordinator";
import logoutIcon from "../../images/logout-icon.png"
import logo from "../../images/logo.png"
import { BiSearchAlt } from "react-icons/bi";

const Header = (props) => {
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("labeddit-token");
    history.push("/");
  };

  const [input, setInput] = useState('')

  const clear = () => {
    setInput('');
    props.setSearchName('');
  }

  return (
    <>
      <Wrapper>
        <div className="container">
          <div
            className="logo-container"
            onClick={() => goToPage(history, "/feed")}
          >
            <img src={logo} alt="logo" />
            <p>Labeddit</p>
          </div>
          <div className="input-container">
            <input placeholder="Realize sua busca aqui" value={input} onChange={(e) => setInput(e.target.value)} />
            <p id="clear" onClick={() => clear()}>
              X
            </p>
            <button>
              <BiSearchAlt onClick={(e) => props.setSearchName(input)} />
            </button>
          </div>
          <div className="button-container">
            <img src={logoutIcon} onClick={logout} alt="logout icon" />
          </div>
        </div>

        <div className="mobile-input-container">
          <input value={input} onChange={(e) => setInput(e.target.value)} />
          <p id="clear" onClick={() => clear()}>
            X
          </p>
          <button>
            <BiSearchAlt onClick={(e) => props.setSearchName(input)} />
          </button>
        </div>
      </Wrapper>
    </>
  );
};

export default Header;
