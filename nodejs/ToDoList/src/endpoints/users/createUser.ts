import { Request, Response } from "express";
import connection from "../../connection";
import { capitalize } from "../../functions/strings";
import { validateEmail } from "../../functions/email";

const createUser = async (req: Request, res: Response): Promise<void> => {
  const { name, nickname, email } = req.body;
  let errorCode: number = 400;
  try {
    for (let key in req.body) {
      if (!req.body[key]) {
        errorCode = 422;
        throw new Error(`'${key}' is not filled.`);
      }
    }
    if (!name || !email || !nickname) {
      errorCode = 404;
      throw new Error(
        "'name', 'nickname' and 'email' are mandatory fields in body."
      );
    }
    if (name && name.length < 3) {
      errorCode = 422;
      throw new Error("Invalid name type. Name must be at least 3 characters.");
    }
    if (nickname && nickname.length < 3) {
      errorCode = 422;
      throw new Error(
        "Invalid nickname type. Name must be at least 3 characters."
      );
    }
    const users: any = await connection("toDoList_users");
    const findUser: any = users.find(
      (user: any): any => user.nickname === nickname
    );
    if (findUser) {
      errorCode = 409;
      throw new Error(
        "This nickname has already been registered by another user."
      );
    }
    const findEmail: any = users.find((user: any): any => user.email === email);
    if (findEmail) {
      errorCode = 409;
      throw new Error(
        "This e-mail has already been registered by another user."
      );
    }
    if (!validateEmail(req.body.email)) {
      errorCode = 422;
      throw new Error("Invalid e-mail type. Plese check your informations.");
    }
    await connection("toDoList_users").insert({
      id: Date.now().toString() as string,
      name: name && (capitalize(name) as String),
      nickname: nickname && (nickname.toLowerCase() as String),
      email: email && (email.toLowerCase() as String),
    });
    res.status(201).send("User successfully created!");
  } catch (error) {
    res.status(errorCode).send({
      message: error.message,
    });
  }
};

export default createUser;
