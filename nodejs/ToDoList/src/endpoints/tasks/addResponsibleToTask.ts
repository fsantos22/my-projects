import { Request, Response } from "express";
import connection from "../../connection";

const addResponsibleToTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  let errorCode: number = 400;
  try {
    const { taskId, responsibleUserIds } = req.body as any;
    for (let key in req.body) {
      if (req.body[key] === "") {
        errorCode = 422;
        throw new Error(`'${key}' is not filled.`);
      }
    }
    if (!taskId || !responsibleUserIds) {
      errorCode = 404;
      throw new Error(
        "'taskId' and 'responsibleUserIds' are mandatory fields in body."
      );
    }
    const users: any = await connection("toDoList_users");
    const tasks: any = await connection("toDoList_tasks");
    const responsibles: any = await connection("toDoList_respUsersTasks");
    const findTask: any = tasks.find((task: any): any => task.id == taskId);
    if (!findTask) {
      errorCode = 404;
      throw new Error(`Task id ${taskId} not found.`);
    }

    const entryType = typeof responsibleUserIds;
    if (entryType === "string") {
      const findUser: any = users.find(
        (user: any): any => user.id == responsibleUserIds
      );
      if (!findUser) {
        errorCode = 404;
        throw new Error(`User id ${responsibleUserIds} not found.`);
      }
      const findDuplicate: any = responsibles.find(
        (result: any): any =>
          result.task_id == taskId &&
          result.responsible_user_id == responsibleUserIds
      );
      if (findDuplicate) {
        errorCode = 409;
        throw new Error("This assignment has already been made.");
      }
      await connection("toDoList_respUsersTasks").insert({
        task_id: taskId as string,
        responsible_user_id: responsibleUserIds as string,
      });
      res.status(201).send("Assignment done successfully!");
    }

    if (entryType === "object") {
      {
        responsibleUserIds.forEach((respUser: string) => {
          let findUser = users.find((user: any): any => user.id == respUser);
          if (!findUser) {
            errorCode = 404;
            throw new Error(`User id ${respUser} not found.`);
          }
          let findDuplicate = responsibles.find(
            (result: any): any =>
              result.task_id == taskId && result.responsible_user_id == respUser
          );
          if (findDuplicate) {
            errorCode = 409;
            throw new Error("This assignment has already been made.");
          }
        });
      }
      for (let i = 0; i < responsibleUserIds.length; i++) {
        await connection("toDoList_respUsersTasks").insert({
          task_id: taskId as string,
          responsible_user_id: responsibleUserIds[i],
        });
      }
      res.status(201).send("Assignment done successfully!");
    }
  } catch (error) {
    res.status(errorCode).send({ message: error.message });
  }
};

export default addResponsibleToTask;
