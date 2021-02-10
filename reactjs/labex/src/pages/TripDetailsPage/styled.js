import styled from "styled-components";

export const TripsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;

  width: 100%;
  max-width: 90vw;

  position: absolute;
  top: 120px;
  left: 50%;
  transform: translate(-50%);
`;

export const SideMenu = styled.div`
  width: 250px;
  padding: 10px;


  h1 {
    font-size: 24px;
    text-align: center;
    margin-bottom: 15px;
  }

  hr {
    width: 80%;
    margin: 10px;

    background: #fff;
  }

  a {
    text-decoration: none;
    color: #000;
  }
  ul {
    list-style: none;
  }
  li {
    text-align: center;
    padding: 5px 0;
    margin-bottom: 10px;
    &:hover {
      background-color: rgba(255, 255, 255, 0.8);
      color: #fff;
    }
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

// export const Content = styled.div`
//   flex-grow: 1;
// `;

// export const DetailsContainer = styled.div`
//   display: flex;
//   flex-direction: column;
  

//   h1 {
//     font-size: 24px;
//     text-align: center;
//     margin-bottom: 15px;
//   }

//   hr {
//     margin: 20px 0;
//   }

//   .container {
//     display: flex;
//     .label {
//       min-width: 100px;
//     }
//   }
//   span {
//     font-weight: bold;
//     color: #dedede;
//   }
// `;

export const ButtonBox=styled.div`
width: 100%;
display: flex;
justify-content: space-around;
`
