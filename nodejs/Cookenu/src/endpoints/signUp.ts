import { Request, Response } from "express";
import { generateId } from "../services/generateId";
import { generateToken } from "../services/authenticator";
import validateEmail from "../services/validateEmail";
import { hashPass } from "../services/hashManager";
import { signUpType, signUpBody } from "../types";
import createUser from "./../data/createUser";
import getUserByEmail from "./../data/getUserByEmail";

const signUp = async (req: Request, res: Response) => {
  try {
    // Gerando ID aleatório
    const id: string = generateId();
    // Campos do body
    const { email, name, password, role = "user" }: signUpType = req.body;

    // VALIDAÇÕES

    // Se campos foram preenchidos
    for (let field in signUpBody) {
      if (!(field in req.body)) {
        res.statusCode = 422;
        throw new Error(`'${field}' is mandatory!`);
      }
    }

    // Se senha tem o mínimo de caracteres
    if (password.length < 6) {
      res.statusCode = 422;
      throw new Error("'password' must be at least 6 characters!");
    }

    // Validando input de e-mail
    if (!validateEmail(email)) {
      res.statusCode = 422;
      throw new Error("Invalid E-mail type!");
    }

    // Verificando se e-mail já está cadastrado
    const user = await getUserByEmail(email);
    if (user) {
      res.statusCode = 409;
      throw new Error("This e-mail has already been registered!");
    }

    // Gerando Token
    const token = generateToken({ id, role });

    // Encriptando senha
    const cypherPassword = await hashPass(password);

    // Enviando pro BD
    await createUser(id, name, email, cypherPassword, role);

    res.status(201).send({ status: "Success!", token: token });
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500).send({ message: "Internal server error" });
    } else {
      res.status(res.statusCode).send({ message: error.message });
    }
  }
};

export default signUp;
