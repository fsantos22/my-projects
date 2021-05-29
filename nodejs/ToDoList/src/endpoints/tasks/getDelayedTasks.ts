import { Request, Response } from "express";
import { millisecondsToStrDate } from "../../functions/date";
import connection from "./../../connection";

const getDelayedTasks = async (req: Request, res: Response): Promise<void> => {
  let errorCode: number = 400;
  try {
    const tasks: any = await connection.raw(`
    SELECT
    toDoList_tasks.*,
    toDoList_users.nickname
    FROM toDoList_tasks
    JOIN toDoList_users
    ON toDoList_tasks.creator_user_id = toDoList_users.id
    WHERE (toDoList_tasks.status NOT LIKE "done" AND toDoList_tasks.limit_date < unix_timestamp()*1000)
    `);
    if (tasks.length < 1) {
      errorCode = 404;
      throw new Error("Task not found.");
    }

    const result: any = tasks[0].map((task: any): any => {
      return {
        taskId: task.id,
        title: task.title,
        description: task.description,
        limitDate: millisecondsToStrDate(task.limit_date),
        creatorUserId: task.creator_user_id,
        creatorUserNickname: task.nickname,
      };
    });
    res.status(200).send({ tasks: result });
  } catch (error) {
    res.status(errorCode).send({ message: error.message });
  }
};

export default getDelayedTasks;
