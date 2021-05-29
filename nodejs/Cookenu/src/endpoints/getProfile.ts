import { Request, Response } from "express";
import { getTokenData } from "../services/authenticator";
import { authenticationData } from "../types";
import getUserById from "./../data/getUserById";

const getProfile = async (req: Request, res: Response) => {
  try {
    const id:string = req.params.id
    const token: string = req.headers.authorization!;
    const tokenData: authenticationData | null = getTokenData(token);

    if (!tokenData) {
      res.statusCode = 401;
      throw new Error("Unauthorized!");
    }

    // Enviando pro BD
    const user = await getUserById(id);

    res.status(200).send({ status: "Success!", user: user });
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500).send({ message: "Internal server error" });
    } else {
      res.status(res.statusCode).send({ message: error.message });
    }
  }
};

export default getProfile;
