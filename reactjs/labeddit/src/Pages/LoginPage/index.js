import React, {useEffect} from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

import { BASE_URL } from "./../../Constants";
import useForm from "./../../hooks/useForm";
import { goToPage } from "./../../routes/Coordinator";

import { Container } from './styled';
import bg from "../../images/pattern-bg.png"
import { BG } from "../../components/Background/styled";
import { useProtectedPage } from './../../hooks/useProtectedPage';

const LoginPage = () => {
  useProtectedPage();
  const history = useHistory();
  const [form, onChange] = useForm({
    email: "",
    password: "",
  });

  const login = (event) => {
    event.preventDefault();
    axios
      .post(`${BASE_URL}/login`, form)
      .then((res) => {
        localStorage.setItem("labeddit-token", res.data.token);
        goToPage(history, "/feed")
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("labeddit-token")
    if(token){
      history.push("/feed")
    }
  }, [history]);

  return (
    <>
      <BG img={bg} />
      <Container>
        <h2>Login</h2>
        <form onSubmit={login}>
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
            pattern="^.{6,15}$"
            title={"A senha deve ter entre 6 e 15 caracteres"}
            value={form.password}
            onChange={onChange}
            placeholder="senha"
            required
          />
          <button>Log In</button>
        </form>
        <p>
          Ainda não é cadastrado? <Link to="/signup"> Cadastre-se!</Link>
        </p>
      </Container>
    </>
  );
};

export default LoginPage;
