import React from 'react';
import { PlaylistBoxContainer } from './../Styled';
import { deleteIcon } from './../Parameters';

export const PlaylistBox = (props) => {
    return (
      <PlaylistBoxContainer key={props.id}>
        <div className="header">
          <h3>{props.name}</h3>
          <img
            className="delete-btn"
            src={deleteIcon}
            onClick={() => props.deletePlaylist(props.playlist)}
            alt=""
          />
        </div>

        <img src={props.url} alt="" />

        <button
          className="btn add-button"
          onClick={() => props.openPlaylist(props.id, props.name)}
        >
          Abrir
        </button>
      </PlaylistBoxContainer>
    );
}
