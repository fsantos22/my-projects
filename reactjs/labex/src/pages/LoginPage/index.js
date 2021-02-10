import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Background, InputsBox, Button } from "./../../components/globalStyles";

import { baseEndpoint } from "./../../components/GlobalInformations";
import useForm from "./../../components/hooks/useForm";
import { useProtectedPage } from "./../../components/hooks/useProtectedPage";

import bg from "../../images/standardBG.jpg";
import loadingGif from "../../images/loading.svg";


const LoginPage = (props) => {
  useProtectedPage();
  const history = useHistory();

  const [form, onChange] = useForm({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false)

  const login = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post(`${baseEndpoint}/login`, form)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setLoading(false);
        props.toggle();
        history.replace("/admin");
      })
      .catch((err) => {
        alert(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      history.replace("/admin");
    }
  }, [history]);

  return (
    <>
      <Background img={bg} />

      <InputsBox>
        {loading ? (
          <div className="loading">
            <img src={loadingGif} />
          </div>
        ) : (
          <>
            <h1>AUTENTICAÇÃO</h1>
            <hr />
            <form onSubmit={login}>
              <div>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="e-mail"
                  required
                />
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={onChange}
                  placeholder="senha"
                  pattern={"^.{6,}"}
                  title={"A senha precisa ter pelo menos 6 caracteres"}
                  required
                />
              </div>
              <Button>ACESSAR</Button>
            </form>
          </>
        )}
      </InputsBox>
    </>
  );
};

export default LoginPage;
