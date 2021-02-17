import styled from 'styled-components'

export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;

  background-image: url(${(props) => props.image});
  width: 100vw;
  height: 100vh;
`;

export const Button = styled.button`
  height: 3rem;
  width: 100%;
  padding: 10px;
  background-color: #cc0000;
  font-weight: bold;
  font-size: 14px;
  color: #ffcb05;
  letter-spacing: 1px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: ${props=>props.borderRadius};

  outline: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #cc0000;
    background-color: #ffcb05;
    transition: all 0.3s ease-in-out;
  }
`;