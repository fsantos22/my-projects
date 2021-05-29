import { Request, Response } from "express";
import connection from "../../connection";

const editTaskStatusById = async (
  req: Request,
  res: Response
): Promise<void> => {
  let errorCode: number = 400;
  const statusOptions: any = ["to_do", "doing", "done"];
  try {
    const { taskIds, status } = req.body;
    if (!Object.values(statusOptions).includes(status as string)) {
      errorCode = 422;
      throw new Error(
        `Invalid status value. Please choose betwwen: 'to_do', 'doing' and 'done'.`
      );
    }
    const tasks = await connection("toDoList_tasks");
    for (let key in req.body) {
      if (req.body[key] === "") {
        errorCode = 422;
        throw new Error(`'${key}' is not filled.`);
      }
    }
    if (!taskIds || !status) {
      errorCode = 404;
      throw new Error(
        "'taskIds' and 'status' are mandatory fields in body."
      );
    }
    const entryType = typeof taskIds;
    if (entryType === "string") {
      const findTask = tasks.find((task: any): any => {
        return task.id === taskIds;
      });
      if (!findTask) {
        errorCode = 404;
        throw new Error(`Task id ${taskIds} not found.`);
      }
      await connection("toDoList_tasks")
        .update({
          status: status as string,
        })
        .where({ id: taskIds as string });
      res.status(201).send("Task successfully updated!");
    }

    if (entryType === "object") {
      {
        taskIds.forEach((taskId: string): void => {
          const findTask = tasks.find((task: any): any => {
            return task.id === taskId;
          });
          if (!findTask) {
            errorCode = 404;
            throw new Error(`Task id ${taskId} not found.`);
          }
        });
      }
      for (let i = 0; i < taskIds.length; i++) {
        await connection("toDoList_tasks")
          .update({
            status: status as string,
          })
          .where({ id: taskIds[i] as string });
      }
      res.status(201).send("Tasks successfully updated!");
    }
  } catch (error) {
    res.status(errorCode).send({
      message: error.message,
    });
  }
};

export default editTaskStatusById;
