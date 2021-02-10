import React from 'react';
import likeGif from "./imgs/like.gif";
import notLikeGif from "./imgs/notLike.gif";
import styled from 'styled-components';

const ResultContainer = styled.div`
position: absolute;
height: 100%;
width: 100%;
z-index: 3;

.result{
position: relative;
top: 17%;
width: 100%;
height: 60%;
transform: (-30%);
}

`

export default function Result(props) {
    return (
      <ResultContainer>
        <img className="result" src={props.likeResult} alt="" />
      </ResultContainer>
    );
}
