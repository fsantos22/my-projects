import styled from 'styled-components'

export const BG = styled.div`
position: fixed;
top: 0;
left: 0;
min-width: 100%;
min-height: 100vh;

background-image:url(${props=>props.img});
`