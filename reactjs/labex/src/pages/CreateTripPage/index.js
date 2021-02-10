import React, { useState } from "react";
import axios from "axios";

import { useHistory } from "react-router-dom";

import {
  Background,
  InputsBox,
  Button,
  BackButton,
} from "./../../components/globalStyles";
import { useProtectedPage } from "./../../components/hooks/useProtectedPage";
import { planets } from "./../../components/GlobalInformations";

import useForm from "./../../components/hooks/useForm";

import { baseEndpoint, auth } from "../../components/GlobalInformations";

import bg from "../../images/standardBG.jpg";

import Confirm from "../../components/Alert/Confirm";
import Alert from "./../../components/Alert/Alert";

const CreateTripPage = () => {
  useProtectedPage();
  const history = useHistory();

  const [alertConfirm, setAlertConfirm] = useState(false)

  const goBack = () => {
    history.goBack();
  };

  const [form, onChange, clearFields] = useForm({
    name: "",
    planet: "",
    description: "",
    durationInDays: "",
  });

  const [date, setDate] = useState(new Date());
  const handleDate = (e) => {
    setDate(e.target.value);
  };

  // Setar data mínima para o dia atual (by Shrinivas Pai - https://stackoverflow.com/users/3243201/shrinivas-pai)
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  today = yyyy + "-" + mm + "-" + dd;
  // -----------------------------------------------

  const createTrip = (event) => {
    // event.preventDefault();
    const newDate = new Date(date);
    let formattedDate =
      newDate.getDate() +
      "/" +
      (newDate.getMonth() + 1) +
      "/" +
      newDate.getFullYear();

    const body = {
      name: form.name,
      planet: form.planet,
      date: formattedDate,
      description: form.description,
      durationInDays: form.durationInDays,
    };

    axios
      .post(`${baseEndpoint}/trips`, body, auth)
      .then((res) => {
        clearFields();
        setDate("");
        setAlertConfirm(true);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <>
      <Background img={bg} />
      <BackButton>
        <Button onClick={goBack}>Voltar ao Menu</Button>
      </BackButton>

      <Alert
        title="NOVA VIAGEM"
        description="A viagem foi cadastrada com sucesso no sistema!"
        alert={alertConfirm}
        setAlert={setAlertConfirm}
      />
      <Confirm
        title="CADASTRO DE VIAGEM"
        description="Tem certeza que deseja criar a viagem?"
      >
        {(confirm) => (
          <InputsBox>
            <h1>INSCRIÇÃO</h1>
            <hr />
            <form onSubmit={confirm(createTrip)}>
              <input
                type="text"
                name="name"
                value={form.name}
                placeholder="Digite o título da viagem"
                pattern={"[a-zA-Z ]{5,50}$"}
                title={
                  "O título precisa ter entre 5 e 50 caracteres (apenas letras)"
                }
                onChange={onChange}
                required
              />
              <select
                name="planet"
                value={form.planet}
                onChange={onChange}
                required
              >
                <option value="" disabled defaultValue>
                  Selecione um planeta de destino
                </option>
                {planets.map((planetName) => {
                  return <option key={planetName}>{planetName}</option>;
                })}
              </select>
              <input
                type="date"
                name="date"
                value={date}
                min={today}
                onChange={handleDate}
                required
              />
              <input
                type="text"
                name="description"
                placeholder="Escreva a descrição da viagem"
                value={form.description}
                pattern={"[0-9a-zA-Z.()!?- ]{30,110}$"}
                title={
                  "O texto deve contar entre 30 e 110 caracteres  e apenas os símbolos . () ! ? -"
                }
                // minLength="30"
                onChange={onChange}
                required
              />
              <input
                type="number"
                name="durationInDays"
                placeholder="Digite a duração da viagem (em dias)"
                value={form.durationInDays}
                min="50"
                onChange={onChange}
                required
              />
              <Button>CONCLUIR INSCRIÇÃO</Button>
            </form>
          </InputsBox>
        )}
      </Confirm>
    </>
  );
};

export default CreateTripPage;
