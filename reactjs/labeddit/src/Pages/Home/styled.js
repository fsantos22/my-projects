import styled from "styled-components";

export const VideoContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
`;

export const VideoBg = styled.video`
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  background: #232a34;
`;

export const Main = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100vw;
  color: #fff;
  text-align: center;
  letter-spacing: 3px;
  padding: 30px;
  background-color: rgba(255, 69, 0, 0.8);

  img {
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:hover {
      transform: scale(1.2);
      transition: all 0.2s ease-in-out;
    }
  }
`;
