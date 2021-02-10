import React from "react";
import { BodyNewsCard } from "./../../components/Styled";

export const BoxNews = (props) => {
  return (
    <div>
      <BodyNewsCard>
        <div className="BoxNews">
          <img src={props.img} alt="" /> <br />
          <p>{props.texto}</p>{" "}
        </div>
      </BodyNewsCard>
    </div>
  );
};
