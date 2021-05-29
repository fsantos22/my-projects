import { Request, Response } from "express";
import connection from "./../../connection";

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  let errorCode: number = 400;
  try {
    const users:any = await connection.raw(`
    SELECT id, nickname FROM toDoList_users
    `);
    res.status(200).send({users: users[0]});
  } catch (error) {
    res.status(errorCode).send({ message: error.message });
  }
};

export default getAllUsers;
