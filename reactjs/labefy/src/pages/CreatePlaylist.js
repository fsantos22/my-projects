import React from "react";
import axios from "axios";
import { baseUrl, axiosConfig } from "../Parameters";
import { Boxes, SessionTitle } from "../Styled";

export class CreatePlaylist extends React.Component {
  state = { playlists: [], inputMusic: "" };

  handleInputMusic = (e) => {
    this.setState({ inputMusic: e.target.value });
  };

  createPlaylist = () => {
    if(window.confirm(`Tem certeza que deseja criar a Playlist ${this.state.inputMusic}?`)){
      let newArr = [...this.state.playlists];
      const Id = newArr.findIndex(
        (playlist) =>
          playlist.name.toLocaleLowerCase() ===
          this.state.inputMusic.toLocaleLowerCase()
      );
      if (Id > -1) {
        alert("Essa playlist já existe! Por favor, escolha outro nome.");
      } else {
        const body = {
          name: this.state.inputMusic,
        };
        axios
          .post(baseUrl, body, axiosConfig)
          .then(() => {
            alert(
              `A playlist ${this.state.inputMusic} foi criada com sucesso!`
            );
            this.setState({ inputMusic: "" });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  render() {
    return (
      <Boxes>
        <SessionTitle>Criar playlist</SessionTitle>
        <input
          className="create-input"
          type="text"
          placeholder="Digite um nome para a Playlist"
          value={this.state.inputMusic}
          onChange={this.handleInputMusic}
        />
        <button className="btn main-btn"  onClick={this.createPlaylist}>
          Criar
        </button>
      </Boxes>
    );
  }
}
