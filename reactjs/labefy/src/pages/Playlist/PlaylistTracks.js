import React from "react";
import { TrackList } from "../../Styled";
import { deleteIcon, closeIcon } from '../../Parameters';

export class PlaylistTracks extends React.Component {
  render() {
    return (
      <>
        <div className="header">
          <h3>{this.props.playlistName}</h3>
          <img className="close-btn" src={closeIcon} onClick={this.props.togglePlaylistTracks} alt="" />
        </div>
        <TrackList>
          {this.props.playlistTracks.map((track) => {
            return (
              <div key={track.id}>
                <p>
                  <span>Artista:</span> {track.artist}
                </p>
                <p>
                  <span>Música:</span> {track.name}
                </p>
                <div className="player-controls">
                  <audio controls="controls">
                    <source src={track.url} type="audio/mp3" />
                  </audio>
                  <img
                    className="delete-btn"
                    src={deleteIcon}
                    onClick={() => this.props.deleteTrack(track)}
                    alt=""
                  />
                </div>
                <hr />
              </div>
            );
          })}
        </TrackList>
      </>
    );
  }
}
