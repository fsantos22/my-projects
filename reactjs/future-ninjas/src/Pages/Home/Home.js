import React from "react";
import styled from "styled-components";
import MaterialHeader from "../../components/MaterialUI/MaterialHeader";
import MaterialFooter from "../../components/MaterialUI/MaterialFooter";
import { Section1 } from "../Home/BodySections/Section1/Section1";
import {Section2} from "../Home/BodySections/Section2/Section2";
import {Section3} from "../Home/BodySections/Section3/Section3";

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

const Hr = styled.hr`
padding: 1px;
background-color: #494949;
margin: 30px;
`

export const Home = (props) => {
  return (
    <>
      <MaterialHeader
        onClickHome={props.onClickHome}
        onClickClient={props.onClickClient}
        onClickAdvertiser={props.onClickAdvertiser}
        onclickAboutUs={props.onclickAboutUs}
      />
      <Body>
        <Section1 />
        <Hr />
        <Section2 />
        <Hr />
        <Section3 />
      </Body>
      <MaterialFooter />
    </>
  );
};
