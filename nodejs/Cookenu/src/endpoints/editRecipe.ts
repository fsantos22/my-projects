import { Request, Response } from "express";
import { getTokenData } from "../services/authenticator";
import { authenticationData, recipeType } from "../types";
import getRecipeById from './../data/getRecipeById';
import putRecipe from './../data/putRecipe';

const editRecipe = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const token: string = req.headers.authorization!;
    const tokenData: authenticationData | null = getTokenData(token);

    if (!tokenData) {
      res.statusCode = 401;
      throw new Error("Unauthorized!");
    }

    // Campos do body
    const { title, description }: recipeType = req.body;
    const recipe = await getRecipeById(id)

    if (tokenData.role !== "admin" && tokenData.id !== recipe.user_id) {
      res.statusCode = 401;
      throw new Error("Unauthorized!");
    }

    // Verifica o tamanho dos inputs
    if (title && title.length < 3) {
      res.statusCode = 422;
      throw new Error(`'title' must be at least 3 characters!`);
    }

    if (description && description.length < 250) {
      res.statusCode = 422;
      throw new Error(`'directions' must be at least 250 characters!`);
    }

    // Enviando pro BD
    await putRecipe(id, title, description);

    res.status(201).send({ status: "Success!", message: "Recipe edited!" });
  } catch (error) {
      console.log(error.message)
    if (res.statusCode === 200) {
      res.status(500).send({ message: "Internal server error" });
    } else {
      res.status(res.statusCode).send({ message: error.message });
    }
  }
};

export default editRecipe;
