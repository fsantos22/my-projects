import { Request, Response } from "express";
import { getTokenData } from "../services/authenticator";
import { authenticationData } from "../types";
import getRecipeById from '../data/getRecipeById';
import delRecipe from '../data/delRecipe';

const deleteRecipe = async (req: Request, res: Response) => {
  try {
    const {id} = req.body
    const token: string = req.headers.authorization!;
    const tokenData: authenticationData | null = getTokenData(token);

    if (!tokenData) {
      res.statusCode = 401;
      throw new Error("Unauthorized!");
    }

    const recipe = await getRecipeById(id)

    if (tokenData.role !== "admin" && tokenData.id !== recipe.user_id) {
      res.statusCode = 401;
      throw new Error("Unauthorized!");
    }

    // Enviando pro BD
    await delRecipe(id);

    res.status(200).send({ status: "Success!", message: "Recipe removed!" });
  } catch (error) {
      console.log(error.message)
    if (res.statusCode === 200) {
      res.status(500).send({ message: "Internal server error" });
    } else {
      res.status(res.statusCode).send({ message: error.message });
    }
  }
};

export default deleteRecipe;
