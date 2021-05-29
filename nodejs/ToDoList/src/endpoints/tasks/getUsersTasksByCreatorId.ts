import { Request, Response } from "express";
import connection from "../../connection";
import { millisecondsToStrDate } from "../../functions/date";

const getUsersTasksByCreatorId = async (req: Request, res: Response): Promise<void> => {
  let errorCode: number = 400;
  try {
    const { creatorUserId } = req.query;
    const query: any = await connection.raw(
      `SELECT
      toDoList_tasks.*, 
      toDoList_users.nickname 
      FROM toDoList_tasks JOIN 
      toDoList_users ON 
      toDoList_tasks.creator_user_id = toDoList_users.id
      WHERE toDoList_tasks.creator_user_id = ${creatorUserId}
      `
    );
    if (query[0].length < 1) {
      errorCode = 404;
      throw new Error(`User id ${creatorUserId} not found.`);
    }
    const tasks:any = query[0].map((task: any): any => {
      return {
        taskId: task.id as string,
        title: task.title as string,
        description: task.description as string,
        limitDate: millisecondsToStrDate(task.limit_date) as string,
        creatorUserId: task.creator_user_id as string,
        status: task.status as string,
        creatorUserNickname: task.nickname as string,
      };
    });
    res.status(200).send({ tasks: tasks });
  } catch (error) {
    res.status(errorCode).send({ message: error.message });
  }
};

export default getUsersTasksByCreatorId;
