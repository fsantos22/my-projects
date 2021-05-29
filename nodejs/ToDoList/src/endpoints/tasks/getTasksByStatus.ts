import { Request, Response } from "express";
import { millisecondsToStrDate } from "../../functions/date";
import connection from "./../../connection";

const getTasksByStatus = async (req: Request, res: Response): Promise<void> => {
  let errorCode: number = 400;
  const statusOptions: any = ["to_do", "doing", "done"];
  try {
    if (!Object.values(statusOptions).includes(req.query.status as string)) {
      errorCode = 422;
      throw new Error(
        `Invalid status value. Please choose betwwen: 'to_do', 'doing' and 'done'.`
      );
    }

    const query: any = await connection.raw(`
    SELECT 
    toDoList_tasks.*,
    toDoList_users.nickname 
    FROM toDoList_tasks 
    JOIN toDoList_users 
    ON toDoList_tasks.creator_user_id = toDoList_users.id
    WHERE toDoList_tasks.status = '${req.query.status as string}'
    `);
    const result: any = query[0];
    const tasks: any = result.map((task: any): any => {
      return {
        taskId: task.id as string,
        title: task.title as string,
        description: task.description as string,
        limitDate: millisecondsToStrDate(task.limit_date) as string,
        creatorUserId: task.creator_user_id as string,
        creatorUserNickname: task.nickname as string,
      };
    });

    res.status(200).send({
      tasks: tasks,
    });
  } catch (error) {
    res.status(errorCode).send({ message: error.message });
  }
};

export default getTasksByStatus;
