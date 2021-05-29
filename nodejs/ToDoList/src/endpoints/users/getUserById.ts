import { Request, Response } from "express";
import connection from "../../connection";

const getUserById = async (req: Request, res: Response): Promise<void> => {
  let errorCode: number = 400;
  try {
    const result:any = await connection.raw(`
    SELECT id, nickname 
    FROM toDoList_users 
    WHERE id = "${req.params.id}"`);
    if (result[0].length < 1) {
      errorCode = 404;
      throw new Error("User id not found.");
    }
    res.status(200).send(result[0][0]);
  } catch (error) {
    res.status(errorCode).send({
      message: error.message,
    });
  }
};

export default getUserById;
