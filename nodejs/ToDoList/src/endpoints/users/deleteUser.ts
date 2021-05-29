import { Request, Response } from "express";
import connection from "../../connection";

const deleteUser = async (req: Request, res: Response) => {
  let errorCode: number = 400;
  const { id } = req.params;
  try {
    const task = await connection("toDoList_users").where({ id: id as string });
    if (task.length < 1) {
      errorCode = 404;
      throw new Error("User id not found.");
    }
    await connection("toDoList_respUsersTasks")
      .delete()
      .where({ responsible_user_id: id as string });
    await connection("toDoList_tasks")
      .delete()
      .where({ creator_user_id: id as string });
    await connection("toDoList_users")
      .delete()
      .where({ id: id as string });
    res.status(201).send("User deleted!");
  } catch (error) {
    res.status(errorCode).send({ message: error.message });
  }
};

export default deleteUser;
