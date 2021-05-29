import { Request, Response } from "express";
import connection from "../../connection";

const deleteTaskById = async (req: Request, res: Response) => {
  let errorCode: number = 400;
  const { id } = req.params;
  try {
    if (!id) {
      errorCode = 404;
      throw new Error("id parameter is missing.");
    }
    const task = await connection("toDoList_tasks").where({id: id as string})
    if (task.length<1) {
      errorCode = 404;
      throw new Error("Task id not found.");
    }
    await connection("toDoList_respUsersTasks")
      .delete()
      .where({ task_id: id as string });
    res.status(201).send("Task deleted!");
    await connection("toDoList_tasks")
      .delete()
      .where({ id: id as string });
  } catch (error) {
    res.status(errorCode).send({ message: error.message });
  }
};

export default deleteTaskById;
