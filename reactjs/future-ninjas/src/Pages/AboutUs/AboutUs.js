import React from "react";
import MaterialHeader from "../../components/MaterialUI/MaterialHeader";
import MaterialFooter from "../../components/MaterialUI/MaterialFooter";
import { BoxUs } from "./BoxUs.js";
import { BoxNews } from "./BoxNews.js";
import imgBox1 from "../../components/images/breaking-news.png";
import imgBox2 from "../../components/images/breaking-news-2.png";
import imgBox3 from "../../components/images/breaking-news-3.png";
import { BodyAboutUs } from "../../components/Styled";

export const AboutUs = (props) => {
  return (
    <div>
      <MaterialHeader
        onClickHome={props.onClickHome}
        onClickClient={props.onClickClient}
        onClickAdvertiser={props.onClickAdvertiser}
        onclickAboutUs={props.onclickAboutUs}
      />
      <BodyAboutUs>
        <BoxUs />
        <h2>Notícias</h2>
        <hr />
        <div id="box-container">
          <BoxNews img={imgBox1} texto={"Future Ninjas é a aposta para 2021"} />
          <BoxNews
            img={imgBox2}
            texto={
              "Surge um novo App para movimentar o mercado dos freelancers"
            }
          />
          <BoxNews
            img={imgBox3}
            texto={"Confira os Apps recomendados para quem quer renda extra"}
          />
        </div>
      </BodyAboutUs>
      <MaterialFooter />
    </div>
  );
};
