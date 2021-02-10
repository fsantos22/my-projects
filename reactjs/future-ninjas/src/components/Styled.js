import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import DetailsIcon from "@material-ui/icons/Details";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

// HEADER -------------------------------------
export const LogoHeader = styled.img`
  width: 250px;
  cursor: pointer;
`;

export const HeaderLogo = styled.img`
  height: 50px;
  cursor: pointer;
`;
export const HeaderToolBar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .btn-container {
    display: flex;
    /* flex-wrap: wrap; */
    justify-content: center;
  }

  @media (max-width: 550px) {
    justify-content: center;
    flex-direction: column;

    .btn-container {
      margin: 0 -25px;
    }
  }
`;

export const WrapperAppBar = styled(AppBar)`
  width: 100vw;
  left: 0;
`;

export const LogoTopBar = styled.img`
  height: 50px;
`;

export const TopBar = styled(Toolbar)`
  justify-content: space-between;

  .Home-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  }
  .Homebtn-container {
    display: flex;
    flex-wrap: wrap;
  }
`;
// ------------------------------------------------

// FOOTER --------------------------------------------
export const DivFooter = styled(BottomNavigation)`
  display: flex;
  background-color: #8661b6;
  justify-content: space-between;
  flex-wrap: wrap;
`;
export const FooterDivButtonSocial = styled.div`
  display: flex;

  @media (max-width: 454px) {
    margin: auto;
  }
`;

export const FooterDivItemsRight = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 694px) {
    display: none;
  }
`;

export const FooterRightButtons = styled(BottomNavigationAction)`
  color: #ffffff;
  width: 120px;
  /* height: 100%; */
  font-size: 100px;
`;

export const FooterButton = styled(BottomNavigationAction)`
  padding: 0;
`;

export const FooterDivLogo = styled.div`
  display: flex;
  width: 120px;
  margin: 0 6px;
  padding: 2px 0px;

  @media (max-width: 454px) {
    display: none;
  }
`;

export const FooterLogo = styled.img`
  width: 100%;
`;

// ----------------------------------------------------------

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;

  .header {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    gap: 10px;
    justify-content: space-evenly;

    #searchbar{
      flex-grow: 1;
    }

    input,
    select {
      height: 1.8rem;
    }
  }
`;

// CARD JOBS ----------------------------------------------

export const Card = styled.div`
  position: relative;
  border: 1px solid black;
  margin: 10px;
  width: 250px;
  background-color: #494949;
  color: #f5f3fc;
  border-radius: 5px;

  P {
    padding: 5px;
  }

  .description {
    height: 100px;
    overflow-y: auto;

    /* width */
    ::-webkit-scrollbar {
      width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: transparent;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #8661b6;
      border: 1px solid #494949;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #a98fde;
    }
  }

  span {
    color: #a98fde;
    font-weight: bold;
  }

  h3 {
    background-color: #8661b6;
    border-radius: 5px 5px 0 0;
    padding: 5px;
    margin: 0;
  }
`;

export const StyledDetailsIcon = styled(DetailsIcon)`
  position: absolute;
  right: 0;
  bottom: 0;
  color: #a98fde;
`;

export const StyledAddIcon = styled(AddBoxIcon)`
  position: absolute;
  right: 0;
  top: 5px;
  color: #494949;
  cursor: pointer;
  &:hover {
    color: #f5f3fc;
  }
`;

export const StyledDeleteForeverIcon = styled(DeleteForeverIcon)`
  position: absolute;
  right: 0;
  top: 5px;
  color: #494949;
  cursor: pointer;
  &:hover {
    color: #f5f3fc;
  }
`;

export const StyledExitToAppIcon = styled(ExitToAppIcon)`
  position: absolute;
  right: 0;
  top: 5px;
  color: #494949;
  cursor: pointer;
  &:hover {
    color: #f5f3fc;
  }
`;
// ------------------------------------------------------------

export const JobsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  margin: auto;
`;

export const SearchBar = styled(TextField)`
  width: 100%;
  .MuiInputBase-input {
    padding: 5px 10px;
  }
`;

export const RegularInput = styled(TextField)`
  .MuiInputBase-input {
    padding: 5px 10px;
    width: 100px;
    min-width: 60px;
  }
`;

export const SelectInput = styled(TextField)`
  .MuiOutlinedInput-input {
    padding: 10px 5px;
  }
  .MuiSelect-select {
    min-width: 100px;
  }
`;

export const MenuItem = styled.h5`
  display: flex;
  color: #333;
  align-items: center;
  margin: 10px;
  &:hover {
    color: #8661b6;
  }
`;

// PAGINA 'HOME' --------------------------------------------------
export const HomeDivContainer = styled.div`
  display: flex;
  min-height: 80vh;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  padding: 10px;
`;

export const HomeDivContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const HomeMainTitle = styled.p`
  font-family: "Source Sans Pro", Helvetica, Arial, sans-serif;
  font-size: 48px;
  line-height: 56px;
  min-width: 55%;
  margin: 5px;
  text-align: center;
`;
export const HomeSubtitle = styled.p`
  width: 70%;
  font-family: "Source Sans Pro", Helvetica, Arial, sans-serif;
  color: #575757;
  font-size: 24px;
  font-weight: 800;
  margin: 5px;
  line-height: 32px;
  text-align: center;
`;

export const HomeDivInputButton = styled.div`
  display: flex;
  min-width: 50%;
`;

export const HomeInputMaterial = styled(TextField)`
  margin: 8px 0px;
  width: 100%;
`;

export const HomeDivFooterContents = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px 0px;

  .container {
    display: flex;
  }
`;

export const HomeVerifiedUserIconPer = styled(VerifiedUserIcon)`
  width: 50px;
`;

export const HomePSloganFooter = styled.p`
  margin: 0px 10px;
  font-size: 20px;
  color: #575757;
`;

export const HomeDivRating = styled.div`
  display: flex;
  margin: 3px 10px;
`;

export const HomeDivImage = styled.div`
  display: flex;
  width: 60%;
  @media (max-width: 1199px) {
    display: none;
  }
`;

export const HomeImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const HomeDivMargin = styled.div`
  margin: 20px 10px;
`;

export const HomeDivContent2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
`;

export const HomeMainTitle2 = styled.p`
  font-family: "Source Sans Pro", Helvetica, Arial, sans-serif;
  font-size: 48px;
  line-height: 56px;
  margin: 5px;
  text-align: center;
  margin: 25px 0;
`;

export const HomeSubtitle2 = styled.p`
  font-family: "Source Sans Pro", Helvetica, Arial, sans-serif;
  color: #575757;
  font-size: 24px;
  font-weight: 800;
  margin: 5px;
  line-height: 32px;
`;
// -------------------------------------------------------


// PAGINA 'QUEM SOMOS' --------------------------------------------------
  export const BodyAboutUs = styled.div`
    display: flex;
    flex-direction: column;

    #box-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      gap: 30px;
    }

    h2 {
      text-align: center;
      padding: 10px;
    }
    hr {
      margin: 10px 50px;
      padding: 1px 10px;
      background-color: #494949;
    }
  `;

  export const AboutUsSection1 = styled.div`
    display: flex;
    margin: auto;
    padding: 15px;
    margin: auto;
    align-items: center;
    min-height: 80vh;

    p {
      font-size: 1.25rem;
      text-align: justify;
      width: 50vw;
      margin-right: 20px;

      @media (max-width:520px) {
        width: 70vw;
      }
    }

    @media (max-width: 700px) {
      .logoStyled {
        display: none;
      }
    }
    @media (max-width: 400px) {
      p {
        font-size: 1.15rem;
      }
    }
  `;

  // CARDS
  export const BodyNewsCard = styled.div`
    display: flex;
    justify-content: space-around;

    .BoxNews {
      background-color: #8661d6;
      border-radius: 5px;
      box-shadow: 5px 5px 10px -5px;
      max-width: 270px;
      height: 200px;
      text-align: center;

      &:hover {
        transform: scale(1.1);
        transition: ease 0.5s;
      }

      p {
        font-weight: bold;
        text-align: justify;
        padding: 1px 5px;
        color: #F5F3FC;
      }
    }

    img {
      margin: auto;
      max-width: 100%;
      border-radius: 5px 5px 0 0 ;
    }

    margin-bottom: 5px;
  `;
  // ---------------------------------------------------

  // JOBS FORM -------------------------------------------
  export const ContainerForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 60vw;
    background-color: #8661b6;
    align-items: center;
    border-radius: 5px;
    padding: 15px;
    border: 1px solid #333;
    margin: auto;

    @media (max-width:600px){
      width: 90vw;
    }

    .pagamento-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      width: 45vw;
      color: #494949;
      align-items: center;
      background-color: #f5f3fc;
      line-height: 4vh;
      border-radius: 3px;

      input {
        margin-right: 15px;
      }
    }
  `;
  export const FormInput = styled.input`
    width: 45vw;
    line-height: 4vh;
    border-radius: 3px;
    background-color: #f5f3fc;
    padding: 5px;
    border: none;
    &:focus {
      outline: none;
    }
  `;

  export const FormText = styled.textarea`
    width: 45vw;
    border-radius: 3px;
    border: none;
    padding: 5px;
    resize: none;
    &:focus {
      outline: none;
    }
  `;
  export const FormLabel = styled.label`
    width: 45vw;
    border: none;
    color: #f5f3fc;
    margin-top: 20px;
  `;
  export const FormTitle = styled.h2`
    padding: 0;
    color: #f5f3fc;
  `;