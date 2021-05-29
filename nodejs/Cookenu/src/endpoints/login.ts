import { Request, Response } from "express";
import { comparePass } from "../services/hashManager";
import { loginType, loginBody } from "../types";
import getUserByEmail from './../data/getUserByEmail';
import { generateToken } from './../services/authenticator';

const login = async (req: Request, res: Response) => {
  try {
    // Campos do body
    const { email, password }: loginType = req.body;

    // VALIDAÇÕES

    // Se campos foram preenchidos
    for (let field in loginBody) {
      if (!(field in req.body)) {
        res.statusCode = 422;
        throw new Error(`'${field}' is mandatory!`);
      }
    }

    // Se e-mail encontra-se no BD
    const user = await getUserByEmail(email)
    if(!user){
        res.statusCode = 404;
        throw new Error(`E-mail not found!`);
    }

    // Checando senha
    const validPass = await comparePass(password, user.password);
    if(!validPass){
        res.statusCode = 401;
        throw new Error(`Invalid password!`);
    }

    // Gerando token
    const token = generateToken({ id: user.user_id, role: user.role });

    res.status(200).send({status: "Success!", token: token})

  } catch (error) {
      console.log(error.message)
    if (res.statusCode === 200) {
      res.status(500).send({ message: "Internal server error" });
    } else {
      res.status(res.statusCode).send({ message: error.message });
    }
  }
};

export default login;
