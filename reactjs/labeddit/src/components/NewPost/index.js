import React from "react";
import axios from "axios";

import { BASE_URL, Auth } from "../../Constants";
import useForm from "./../../hooks/useForm";

import { Container } from "./styled";
import sendIcon from "../../images/send-icon.png";

const NewPost = (props) => {
  const [form, onChange, clearFields] = useForm({
    title: "",
    text: "",
  });

  const createPost = (event) => {
    event.preventDefault();
    axios
      .post(`${BASE_URL}/posts`, form, Auth)
      .then((res) => {
        clearFields();
        props.getPosts();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Container>
      <form onSubmit={createPost}>
        <div className="inputs-container">
          <input
            placeholder="Título"
            name="title"
            type="text"
            pattern="^.{5,100}$"
            title={"O título deve ter entre 5 e 100 caracteres"}
            value={form.title}
            onChange={onChange}
            required
          />
          <textarea
            placeholder="Texto"
            name="text"
            type="text"
            pattern="^.{30,2000}$"
            title={"O texto deve ter entre 30 e 2000 caracteres"}
            value={form.text}
            onChange={onChange}
            required
          />
        </div>
        <div id="send-icon" onClick={createPost}>
          <img src={sendIcon} alt="send icon" />
          <p>Postar</p>
        </div>
      </form>
    </Container>
  );
};

export default NewPost;
