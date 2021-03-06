import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 800px;
  max-width: 90vw;
  padding: 20px;

  position: absolute;
  top: calc(50% + 40px);
  left: 50%;
  transform: translate(-50%, -50%);

  color: #fff;
  text-shadow: 1px 1px #000;
  border: 1px solid #fff;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.5);

  h1 {
    font-size: 24px;
  }
  p {
    font-size: 17px;
    text-align: justify;
  }
  hr {
    width: 80%;
    margin: 20px;

    background: #fff;
  }
`;

export const AdminMenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 800px;
  max-width: 90vw;

  position: absolute;
  top: 60px;
  left: 50%;
  transform: translate(-50%);
`;