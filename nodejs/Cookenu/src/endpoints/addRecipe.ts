import { Request, Response } from "express";
import { getTokenData } from "../services/authenticator";
import { authenticationData, recipeBody, recipeType } from "../types";
import { generateId } from './../services/generateId';
import getUserById from './../data/getUserById';
import createRecipe from './../data/createRecipe';

const addRecipe = async (req: Request, res: Response) => {
  try {
    // Gerando ID aleatório
    const id: string = generateId();
    const token: string = req.headers.authorization!;
    const tokenData: authenticationData | null = getTokenData(token);

    if (!tokenData) {
      res.statusCode = 401;
      throw new Error("Unauthorized!");
    }

    // Campos do body
    const { title, description }: recipeType = req.body;
    const user = await getUserById(tokenData.id);
    const createdAt: number = Math.floor(Date.now() / 1000);
    console.log('token', tokenData)
    console.log('user',user)

    // Se campos foram preenchidos
    for (let field in recipeBody) {
      if (!(field in req.body)) {
        res.statusCode = 422;
        throw new Error(`'${field}' is mandatory!`);
      }
    }

    // Verifica o tamanho dos inputs
    if (title.length < 3) {
      res.statusCode = 422;
      throw new Error(`'title' must be at least 3 characters!`);
    }

    if (description.length < 250) {
      res.statusCode = 422;
      throw new Error(`'directions' must be at least 250 characters!`);
    }

    // Enviando pro BD
    await createRecipe(id, user?.user_id, title, description, createdAt);

    res.status(201).send({ status: "Success!", message: "Recipe created!" });
  } catch (error) {
      console.log(error.message)
    if (res.statusCode === 200) {
      res.status(500).send({ message: "Internal server error" });
    } else {
      res.status(res.statusCode).send({ message: error.message });
    }
  }
};

export default addRecipe;
