import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import logo from "../images/logoH.png";
import StyledButton from "../MaterialUI/MaterialButton";
import { HeaderLogo, HeaderToolBar, WrapperAppBar } from "../Styled";

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function HideAppBar(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <WrapperAppBar>
          <HeaderToolBar>
            <HeaderLogo src={logo} alt="" onClick={props.onClickHome} />
            <div className="btn-container">
              <StyledButton text="Sobre" onClickBtn={props.onclickAboutUs} />
              <StyledButton text="Cliente" onClickBtn={props.onClickClient} />
              <StyledButton
                text="Anunciante"
                onClickBtn={props.onClickAdvertiser}
              />
            </div>
          </HeaderToolBar>
        </WrapperAppBar>
      </HideOnScroll>
      <Toolbar />
    </React.Fragment>
  );
}
