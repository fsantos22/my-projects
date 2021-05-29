import { Request, Response } from "express";
import connection from "../../connection";

const deleteResponsibleFromTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  let errorCode: number = 400;
  const { taskId, responsibleUserId } = req.params as any;
  try {
    const findUser = await connection("toDoList_users").where({
      id: responsibleUserId,
    });
    const findTask = await connection("toDoList_tasks").where({
      id: taskId,
    });
    const resp = await connection("toDoList_respUsersTasks");
    if (findUser.length<1) {
      errorCode = 404;
      throw new Error(`User id ${responsibleUserId} not found.`);
    }
    if (findTask.length<1) {
      errorCode = 404;
      throw new Error(`Task id ${taskId} not found.`);
    }
    const findAssignment: any = resp.find(
      (result: any): any =>
        result.task_id == taskId &&
        result.responsible_user_id == responsibleUserId
    );
    if (!findAssignment) {
      errorCode = 404;
      throw new Error("This user is not assigned to this task.");
    }
    await connection("toDoList_respUsersTasks")
      .delete()
      .where({ task_id: taskId, responsible_user_id: responsibleUserId });
      res.status(201).send("The assignment was removed successfully!")
  } catch (error) {
    res.status(errorCode).send({ message: error.message });
  }
};

export default deleteResponsibleFromTask;
