import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { baseUrl, user } from "./components/Parameters";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import MatchesPage from "./MatchesPage";
import loadingIcon from "./imgs/Infinity-1s-200px.svg";
import Result from "./Result";
import likeGif from "./imgs/like.gif";
import notLikeGif from "./imgs/notLike.gif";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  height: 90vh;
  width: 50.625vh;
  box-shadow: 2px 2px 10px -2px;
  border-radius: 5px;
  background-color: white;

  .loading {
    margin: auto;
  }

  .preloadGifs{
    position: absolute;
    top: 30%;
    z-index:-1;
    img {
      width: 1px;
      height: 1px;
    }

  }
`;

export default function Home() {
  const [MatchList, setMatchList] = useState(false);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(false);
  const [isMatch, setIsMatch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setResult(false);
      return () => clearTimeout(timeout);
    }, 2000);
  }, [result]);

  const changePage = () => {
    setMatchList(!MatchList);
  };
  const [profile, setProfile] = useState({});
  const loadProfile = async () => {
    console.log(user);
    setLoading(true);
    try {
      const res = await axios.get(`${baseUrl}/${user}/person`);
      setProfile(res.data.profile);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const swipeRight = () => {
    const body = {
      id: profile.id,
      choice: true,
    };
    axios
      .post(`${baseUrl}/${user}/choose-person`, body)
      .then((res) => {
        setIsMatch(res.data.isMatch);
        setResult(true);
        loadProfile();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const swipeLeft = () => {
    const body = {
      id: profile.id,
      choice: false,
    };
    axios
      .post(`${baseUrl}/${user}/choose-person`, body)
      .then((res) => {
        setIsMatch(res.data.isMatch);
        setResult(true);
        loadProfile();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    loadProfile();
  }, []);

  let resultGif = isMatch ? likeGif : notLikeGif;

  return (
    <HomeContainer>
      <Header MatchList={MatchList} changePage={changePage} />
      {loading ? (
        <img className="loading" src={loadingIcon} alt="" />
      ) : MatchList ? (
        <MatchesPage user={user} />
      ) : (
        <>
          {result && <Result likeResult={resultGif} />}
          <div className="preloadGifs">
            <img src={likeGif} alt="Like Gif" />
            <img src={notLikeGif} alt="Dislike Gif" />
          </div>
          <MainContent profile={profile} />
          <Footer swipeLeft={swipeLeft} swipeRight={swipeRight} />
        </>
      )}
    </HomeContainer>
  );
}
