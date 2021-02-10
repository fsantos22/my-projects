import React from "react";
import { Wrapper } from "./Styled";
import { Home } from "./pages/Home";
import { CreatePlaylist } from "./pages/CreatePlaylist";
import { Playlists } from "./pages/Playlist/Playlists";
import { AddTrack } from "./pages/AddTrack";
import { logoIcon } from './Parameters';

export default class App extends React.Component {
  state = {
    telaAtual: "Home",
  };

  goToCreatePlaylist = () => {
    this.setState({ telaAtual: "Create Playlist" });
  };

  goToPlaylists = () => {
    this.setState({ telaAtual: "Playlists" });
  };

  goToHome = () => {
    this.setState({ telaAtual: "Home" });
  };

  goToAddTrack = () => {
    this.setState({ telaAtual: "Add Track" });
  };

  render() {
    const TelaAtual = () => {
      switch (this.state.telaAtual) {
        case "Home":
          return <Home />;
        case "Create Playlist":
          return <CreatePlaylist />;
        case "Playlists":
          return <Playlists />;
        case "Add Track":
          return <AddTrack />;
      }
    };
    return (
      <Wrapper>
        <nav>
          <div className="logo-box">
            <span onClick={this.goToHome}>Labefy</span>
            <img className="logo" src={logoIcon} alt="" />
          </div>
          <ul>
            <li>
              <button className="btn nav-btn" onClick={this.goToCreatePlaylist}>
                Criar Playlist
              </button>
            </li>
            <li>
              <button className="btn nav-btn" onClick={this.goToPlaylists}>
                Ver Playlists
              </button>
            </li>
            <li>
              <button className="btn nav-btn" onClick={this.goToAddTrack}>
                Adicionar Música
              </button>
            </li>
          </ul>
        </nav>
        {TelaAtual()}
      </Wrapper>
    );
  }
}
