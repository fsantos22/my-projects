import React, { useState } from "react";
import axios from "axios";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { Container } from "./styled";
import { Auth, BASE_URL } from "./../../Constants";
import { goToPage } from "./../../routes/Coordinator";
import { useHistory } from "react-router-dom";

const Post = (props) => {
  // Data -----------------------------------------------
  const myDate = new Date(props.date);
  const date =
    ("0" + myDate.getDate()).slice(-2) +
    "/" +
    ("0" + (myDate.getMonth() + 1)).slice(-2) +
    "/" +
    myDate.getFullYear() +
    " " +
    myDate.getHours() +
    ":" +
    ("0" + myDate.getMinutes()).slice(-2) +
    ":" +
    (myDate.getSeconds() < 10
      ? "0" + myDate.getSeconds()
      : myDate.getSeconds());
  // -----------------------------------------------------

  const [votes, setVotes] = useState(props.votes);
  const [direction, setDirection] = useState(props.userVoteDirection);
  const history = useHistory();

  const voteDirection = (vote) => {
    const body = { direction: vote };
    axios
      .put(`${BASE_URL}/posts/${props.postId}/vote`, body, Auth)
      .then((res) => {})
      .catch((err) => {
        alert(err.message);
      });
  };

  const voteUp = () => {
    if (direction > 0) {
      setDirection(0);
      voteDirection(0);
      setVotes(votes - 1);
    } else {
      setDirection(1);
      voteDirection(1);
      setVotes(votes + 1);
    }
  };

  const voteDown = () => {
    if (direction < 0) {
      setDirection(0);
      voteDirection(0);
      setVotes(votes + 1);
    } else {
      setDirection(-1);
      voteDirection(-1);
      setVotes(votes - 1);
    }
  };

  return (
    <Container>
      <div className="header">
        <p id="user">{props.user}</p>
        <p id="date">{date}</p>
      </div>
      <div
        className="main"
        onClick={() => goToPage(history, `/post/${props.postId}`)}
      >
        <h3>{props.title}</h3>

        <p>{props.text}</p>
      </div>
      <div className="footer">
        <div className="vote">
          <GoArrowUp
            id="arrow-up"
            onClick={() => voteUp()}
            color={direction > 0 ? "blue" : "grey"}
          />
          <p>
            <span id="vote-number">{votes}</span>
          </p>
          <GoArrowDown
            id="arrow-down"
            onClick={() => voteDown()}
            color={direction < 0 ? "red" : "grey"}
          />
        </div>
        <p>
          Comentários: <span>{props.comments}</span>
        </p>
      </div>
    </Container>
  );
};

export default Post;
