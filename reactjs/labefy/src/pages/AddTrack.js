import React from "react";
import axios from "axios";
import { baseUrl, axiosConfig } from "../Parameters";
import { Boxes, SessionTitle } from "../Styled";

export class AddTrack extends React.Component {
  state = {
    playlists: [],
    newTrackName: "",
    newTrackArtist: "",
    newTrackUrl: "",
    selectedPlaylistId: "",
  };

  componentDidMount() {
    this.getAllPlaylists();
  }

  handleNewTrackName = (e) => {
    this.setState({ newTrackName: e.target.value });
  };

  handleNewTrackArtist = (e) => {
    this.setState({ newTrackArtist: e.target.value });
  };

  handleNewTrackUrl = (e) => {
    this.setState({ newTrackUrl: e.target.value });
  };

  selectedPlaylist = (e) => {
    this.setState({ selectedPlaylistId: e.target.value });
  };

  getAllPlaylists = async () => {
    try {
      const res = await axios.get(baseUrl, axiosConfig);
      this.setState({ playlists: res.data.result.list });
    } catch (err) {
      console.log(err);
    }
  };

  addTrackToAnyPlaylist = () => {
    const {
      newTrackName,
      newTrackArtist,
      newTrackUrl,
    } = this.state;
    const body = {
      name: newTrackName,
      artist: newTrackArtist,
      url: newTrackUrl,
    };
    if(newTrackUrl.includes(".mp3") === true) {
      axios
        .post(
          `${baseUrl}/${this.state.selectedPlaylistId}/tracks`,
          body,
          axiosConfig
        )
        .then((res) => {
          this.setState({
            newTrackName: "",
            newTrackArtist: "",
            newTrackUrl: "",
          });
          alert("Música adicionada com sucesso!");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Por favor, insira um link válido!")
    }
  };

  render() {
    const { newTrackName, newTrackArtist, newTrackUrl } = this.state;
    return (
      <Boxes>
        <SessionTitle>Adicionar música</SessionTitle>
        <div className="inputs">
          <div>
            <label>Música:</label>
            <input
              type="text"
              value={newTrackName}
              onChange={this.handleNewTrackName}
            />
          </div>
          <div>
            <label>Artista:</label>
            <input
              type="text"
              value={newTrackArtist}
              onChange={this.handleNewTrackArtist}
            />
          </div>
          <div>
            <label>Url do MP3:</label>
            <input
              type="text"
              value={newTrackUrl}
              onChange={this.handleNewTrackUrl}
            />
          </div>
          <div>
            <label>Playlist:</label>
            <select onChange={this.selectedPlaylist}>
              <option></option>
              {this.state.playlists.map((playlist) => {
                return <option key={playlist.id} value={playlist.id}>{playlist.name}</option>;
              })}
            </select>
          </div>
        </div>
        <button className="btn main-btn" onClick={this.addTrackToAnyPlaylist}>Adicionar Música</button>
      </Boxes>
    );
  }
}
