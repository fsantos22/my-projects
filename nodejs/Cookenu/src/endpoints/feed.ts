import { Request, Response } from "express";
import { getTokenData } from "../services/authenticator";
import { authenticationData } from "../types";
import showFeed from './../data/showFeed';

const feed = async (req: Request, res: Response) => {
  try {
      const token: string = req.headers.authorization!;
      const tokenData: authenticationData | null = getTokenData(token);

      if (!tokenData) {
        res.statusCode = 401;
        throw new Error("Unauthorized!");
      }

      const followingTableName:string = `cookenu_following_${tokenData.id}`;

      // Enviando pro BD
      const recipes = await showFeed(followingTableName);

      res.status(200).send({ status: "Success!", recipes: recipes });
  } catch (error) {
      console.log(error.message)
    if (res.statusCode === 200) {
      res.status(500).send({ message: "Internal server error" });
    } else {
      res.status(res.statusCode).send({ message: error.message });
    }
  }
};

export default feed;
