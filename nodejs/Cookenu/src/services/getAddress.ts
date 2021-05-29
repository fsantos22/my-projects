import axios from "axios";
import { AddressType } from "../types";

const BASE_URL: string = "https://viacep.com.br/ws";

const getAddress = async (cep: string): Promise<AddressType | null> => {
  try {
    const result = await axios.get(`${BASE_URL}/${cep}/json`);
    const { logradouro, bairro, localidade, uf } = result.data;
    return {
      street: logradouro,
      neighbourhood: bairro,
      city: localidade,
      state: uf,
    };
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export default getAddress;
