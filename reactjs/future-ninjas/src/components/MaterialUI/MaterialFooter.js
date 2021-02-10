import React from "react";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import logoImage from "../images/logoH.png";
import {
  DivFooter,
  FooterDivButtonSocial,
  FooterDivItemsRight,
  FooterRightButtons,
  FooterButton,
  FooterDivLogo,
  FooterLogo,
} from "./../Styled";

export default function SimpleBottomNavigation() {

  return (
    <DivFooter>
      <FooterDivLogo>
        <FooterLogo src={logoImage} alt="Logo" />
      </FooterDivLogo>
      <FooterDivButtonSocial>
        <a href="https://www.whatsapp.com" target="_blank">
          <FooterButton
            label="Whatsapp"
            value="Whatsapp"
            icon={<WhatsAppIcon style={{ color: "#ffffff" }} />}
          />
        </a>
        <a href="https://www.twitter.com" target="_blank">
          <FooterButton
            label="Twitter"
            value="Twitter"
            icon={<TwitterIcon style={{ color: "#ffffff" }} />}
          />
        </a>
        <a href="https://www.instagram.com" target="_blank">
          <FooterButton
            label="Instagram"
            value="Instagram"
            icon={<InstagramIcon style={{ color: "#ffffff" }} />}
          />
        </a>
        <a href="https://www.facebook.com" target="_blank">
          <FooterButton
            label="Facebook"
            value="Facebook"
            icon={<FacebookIcon style={{ color: "#ffffff" }} />}
          />
        </a>
      </FooterDivButtonSocial>
      <FooterDivItemsRight>
        <FooterRightButtons
          label="Fale conosco"
          value="Fale conosco"
          showLabel={true}
        />

        <FooterRightButtons
          label="Termos de uso"
          value="Termos de uso"
          showLabel={true}
        />
      </FooterDivItemsRight>
    </DivFooter>
  );
}