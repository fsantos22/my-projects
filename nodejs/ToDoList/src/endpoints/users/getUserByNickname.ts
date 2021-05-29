import { Request, Response } from "express";
import connection from "../../connection";

const getUserByNickname = async (
  req: Request,
  res: Response
): Promise<void> => {
  let errorCode: number = 400;
  const {query} = req.query
  try {
    const user: any = await connection.raw(`
    SELECT id, nickname 
    FROM toDoList_users 
    WHERE nickname LIKE "%${query}%"
    `);
    if(user[0].length < 1){
        errorCode = 404
        throw new Error("User not found.")
    }
    res.status(200).send({ users: user[0] });
  } catch (error) {
    res.status(errorCode).send({ message: error.message });
  }
};

export default getUserByNickname;
