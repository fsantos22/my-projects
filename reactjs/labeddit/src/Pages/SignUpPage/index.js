import React, {useEffect} from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

import { BASE_URL } from "./../../Constants";
import useForm from "./../../hooks/useForm";
import { goToPage } from "./../../routes/Coordinator";

import { Container } from "./styled";
import bg from "../../images/pattern-bg.png";
import { BG } from "../../components/Background/styled";

const SignUpPage = () => {
  const history = useHistory();
  const [form, onChange] = useForm({
    username: "",
    email: "",
    password: "",
  });

  const login = (event) => {
    event.preventDefault();
    axios
      .post(`${BASE_URL}/signup`, form)
      .then((res) => {
        alert("Parabéns, você está cadastrado!");
        localStorage.setItem("labeddit-token", res.data.token);
        goToPage(history, "/feed");
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("labeddit-token");
    if (token) {
      history.push("/feed");
    }
  }, [history]);

  return (
    <>
      <BG img={bg} />
      <Container>
        <h2>Novo cadastro</h2>
        <form onSubmit={login}>
          <input
            name="username"
            type="text"
            min="4"
            max="15"
            value={form.username}
            onChange={onChange}
            placeholder="Username"
            required
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            placeholder="E-mail"
            required
          />
          <input
            name="password"
            type="password"
            pattern="^.{6,15}$"
            title={"A senha deve ter entre 6 e 15 caracteres"}
            value={form.password}
            onChange={onChange}
            placeholder="Senha"
            required
          />
          <button>Cadastrar</button>
        </form>
        <p>
          Já é cadastrado? <Link to="/login"> Fazer login</Link>
        </p>
      </Container>
    </>
  );
};

export default SignUpPage;
