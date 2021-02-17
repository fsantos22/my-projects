import styled from "styled-components";

export const PokemonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;

  .filter-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    gap: 15px;
    input {
      height: 2rem;
      padding: 10px;
    }

    border-radius: 10px;
    background-color: rgba(255, 203, 5, 0.8);
    padding: 15px;

    .searchbar {
      input {
        width: 100%;
        border-radius: 5px;
        outline: none;
        border: none;
      }
    }

    .number-filter {
      display: flex;
      align-items: center;

      label {
        color: #cc0000;
        font-weight: bold;
      }

      input {
        margin-right: 15px;
        width: 220px;
        border-radius: 5px;
        outline: none;
        border: none;
      }

      @media screen and (max-width: 439px) {
        flex-direction: column;
        align-items: center;
        input{
          margin-right: 1px;
          width: 100%;
        }
        .btn-container {
          width: 100%;
          margin-top:15px;
        }
        }  
      }
    }

    .btn-container {
      display: flex;
      flex-grow: 1;
    }
  }

  .pokemons-list {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 25px;
    padding: 15px;
  }
`;
