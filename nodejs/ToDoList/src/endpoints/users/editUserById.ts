import { Request, Response } from "express";
import connection from "../../connection";
import { capitalize } from "../../functions/strings";

const editUserById = async (req: Request, res: Response): Promise<void> => {
  let errorCode: number = 400;
  const { name, nickname } = req.body;
  const {id} = req.params
  try {
    for (let key in req.body) {
      if (req.body[key] === "") {
        errorCode = 422;
        throw new Error(`'${key}' is not filled.`);
      }
    }
    if(!name && !nickname){
      errorCode = 422;
      throw new Error(`Fill at least one field ('name' or 'nickname') in body.`);
    }
    const users = await connection("toDoList_users");
    const findUser = users.find((user: any): any => user.id == id);
    if (!findUser) {
      errorCode = 404;
      throw new Error(`User id ${id} not found.`);
    }
    await connection("toDoList_users").update({
      name: name && capitalize(name) as string,
      nickname: nickname && nickname.toLowerCase() as string,
    }).where({id: id as string})
    res.status(201).send("User successfully updated!");
  } catch (error) {
    res.status(errorCode).send({
      message: error.message,
    });
  }
};

export default editUserById;
