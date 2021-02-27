import React from 'react'
import loadingGif from "../../images/loading.gif"
import { Container } from './styled';

const Loading = () => {
    return (
        <Container>
            <img src={loadingGif} alt="loading" />
        </Container>
    )
}

export default Loading
