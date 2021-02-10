import React from "react";
import axios from "axios";
import { baseUrl, axiosConfig, deleteIcon } from "../../Parameters";
import {
  MainContainer,
  PlaylistsContainer,
  PlaylistBoxContainer,
  PlayListTracksBox,
  SessionTitle,
} from "../../Styled";
import { PlaylistTracks } from "./PlaylistTracks";
import { PlaylistBox } from "../../components/PlaylistBox";

export class Playlists extends React.Component {
  state = {
    playlists: [],
    playlistTracks: [],
    playlistId: "",
    playlistName: "",
    openPlaylistTracks: false,
  };

  componentDidMount() {
    this.getAllPlaylists();
    this.setState({ openPlaylistTracks: false });
  }

  getAllPlaylists = async () => {
    try {
      const res = await axios.get(baseUrl, axiosConfig);
      this.setState({ playlists: res.data.result.list });
    } catch (err) {
      console.log(err);
    }
  };

  openPlaylist = async (id, name) => {
    this.setState({ openPlaylistTracks: true });
    try {
      const res = await axios.get(`${baseUrl}/${id}/tracks`, axiosConfig);

      this.setState({
        playlistTracks: res.data.result.tracks,
        playlistName: name,
        playlistId: id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  togglePlaylistTracks = () => {
    this.setState({ openPlaylistTracks: !this.state.openPlaylistTracks });
  };

  deleteTrack = (track) => {
    const { playlistId, playlistName } = this.state;
    if (
      window.confirm(`Tem certeza que deseja excluir a música ${track.name}?`)
    ) {
      axios
        .delete(
          `${baseUrl}/${this.state.playlistId}/tracks/${track.id}`,
          axiosConfig
        )
        .then((res) => {
          this.openPlaylist(playlistId, playlistName);
          alert("Música excluída com sucesso!");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  deletePlaylist = (playlist) => {
    if (
      window.confirm(
        `Tem certeza que deseja excluir a playlist ${playlist.name}?`
      )
    ) {
      axios
        .delete(`${baseUrl}/${playlist.id}`, axiosConfig)
        .then(() => {
          alert(`A playlist ${playlist.name} foi excluída com sucesso!`)
          this.getAllPlaylists();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    return (
      <>
        <MainContainer id="box">
          <SessionTitle>Playlists</SessionTitle>
          <PlaylistsContainer>
            {this.state.playlists.map((playlist) => {
              let url = `https://source.unsplash.com/278x200/?${playlist.name}`;
              return (
                <PlaylistBox
                  id={playlist.id}
                  playlist={playlist}
                  name={playlist.name}
                  url={url}
                  deletePlaylist={this.deletePlaylist}
                  openPlaylist={this.openPlaylist}
                />
              );
            })}
          </PlaylistsContainer>
        </MainContainer>
        {this.state.openPlaylistTracks && (
          <PlayListTracksBox>
            <PlaylistTracks
              playlistTracks={this.state.playlistTracks}
              playlistName={this.state.playlistName}
              deleteTrack={this.deleteTrack}
              togglePlaylistTracks={this.togglePlaylistTracks}
            />
          </PlayListTracksBox>
        )}
      </>
    );
  }
}
