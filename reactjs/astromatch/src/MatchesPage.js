import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { baseUrl } from "./components/Parameters";
import loadingIcon from "./imgs/Infinity-1s-200px.svg";

const MatchesContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: flex-start;

  .loading {
    margin: auto;
  }

  div {
    display: flex;
    align-items: center;
    height: 70px;
    width: 100%;
    padding: 10px;
    gap: 10px;
    cursor: pointer;
    &:hover {
      background-color: lightgray;
      transition: linear 0.5s;
    }
  }

  img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }
`;

export default function MatchesPage(props) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadMatches = async () => {
    try {
      const res = await axios.get(`${baseUrl}/${props.user}/matches`);
      setMatches(res.data.matches);
      setLoading(false)
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    loadMatches();
  }, [matches]);

  return (
    <MatchesContainer>
      {loading ? (
        <img className="loading" src={loadingIcon} alt="" />
      ) : (
        matches.map((match) => {
          return (
            <div>
              <img src={match.photo} alt="" />
              <p>{match.name}</p>
            </div>
          );
        })
      )}
    </MatchesContainer>
  );
}
