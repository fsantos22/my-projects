import React from "react";
import axios from "axios";
import StyledButton from "../../components/MaterialUI/MaterialButton";
import {
  ContainerForm,
  FormInput,
  FormText,
  FormLabel,
  FormTitle,
} from "./../../components/Styled";
export default class RegisterJob extends React.Component {
  state = {
    inputTitle: "",
    inputDescription: "",
    inputValue: "",
    inputPayment: [],
    inputDueDate: "",
  };
  handleInputTitle = (e) => {
    this.setState({ inputTitle: e.target.value });
  };

  handleInputDescription = (e) => {
    this.setState({ inputDescription: e.target.value });
  };

  handleInputValue = (e) => {
    this.setState({ inputValue: Number(e.target.value) });
  };

  handleInputDueDate = (e) => {
    this.setState({ inputDueDate: Number(e.target.value) });
  };

  createNeWJob = () => {
    let paymentMethodsArr = [];
    let checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
    for (let i = 0; i < checkboxes.length; i++) {
      paymentMethodsArr.push(checkboxes[i].value);
    }

    const body = {
      title: this.state.inputTitle,
      description: this.state.inputDescription,
      value: this.state.inputValue,
      paymentMethods: paymentMethodsArr,
      dueDate: this.state.inputDueDate,
    };

    axios
      .post(
        "https://us-central1-labenu-apis.cloudfunctions.net/futureNinjasOne/jobs",
        body
      )
      .then((resposta) => {
        alert("Proposta de trabalho criada com sucesso :)");
        this.setState({ inputTitle: "" });
        this.setState({ inputDescription: "" });
        this.setState({ inputValue: "" });
        this.setState({ inputPayment: [] });
        this.setState({ inputDueDate: "" });
      })
      .catch((erro) => {
        alert("Não foi possivel criar proposta de trabalho :(");
      });
  };

  render() {
    return (
      <ContainerForm>
        <FormTitle>Cadastre um novo Job</FormTitle>
        <FormLabel>Titulo</FormLabel>
        <FormInput
          value={this.state.inputTitle}
          onChange={this.handleInputTitle}
        />
        <FormLabel>Descrição</FormLabel>
        <FormText
          rows="4"
          cols="50"
          value={this.state.inputDescription}
          onChange={this.handleInputDescription}
        />
        <FormLabel>Valor da remuneração (R$)</FormLabel>
        <FormInput
          type="number"
          value={this.state.inputValue}
          onChange={this.handleInputValue}
        />
        <FormLabel>
          Método(s) de pagamento
        </FormLabel>
        <div className="pagamento-container">
          <label>
            Dinheiro <input type="checkbox" value="Dinheiro" />
          </label>
          <label>
            Crédito <input type="checkbox" value="Crédito" />
          </label>
          <label>
            Débito <input type="checkbox" value="Débito" />
          </label>
          <label>
            Boleto <input type="checkbox" value="Boleto" />
          </label>
          <label>
            Transferência <input type="checkbox" value="Transferência" />
          </label>
          <label>
            Pix <input type="checkbox" value="Pix" />
          </label>
        </div>
        <FormLabel>Prazo (dias)</FormLabel>
        <FormInput
          type="number"
          value={this.state.inputDueDate}
          onChange={this.handleInputDueDate}
        />
        <StyledButton text={"Cadastrar Job"} onClickBtn={this.createNeWJob} />
      </ContainerForm>
    );
  }
}
