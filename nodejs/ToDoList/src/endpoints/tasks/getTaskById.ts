import { Request, Response } from "express";
import { millisecondsToStrDate } from "../../functions/date";
import connection from "./../../connection";

const getTaskById = async (req: Request, res: Response): Promise<void> => {
  let errorCode: number = 400;
  try {
    const { id } = req.params;
    const tasks: any = await connection("toDoList_tasks").where({
      id: id,
    });
    if (tasks.length < 1) {
      errorCode = 404;
      throw new Error(`Task id ${id} not found.`);
    }
    const query: any = await connection.raw(`
    SELECT 
    toDoList_tasks.*,
    toDoList_users.nickname 
    FROM toDoList_tasks 
    JOIN toDoList_users 
    ON toDoList_tasks.creator_user_id = toDoList_users.id
    WHERE toDoList_tasks.id=${id as string}
    `);

    const responsibles: any = await connection.raw(`SELECT 
    toDoList_respUsersTasks.*,
    toDoList_users.nickname 
    FROM toDoList_respUsersTasks 
    JOIN toDoList_users 
    ON toDoList_respUsersTasks.responsible_user_id = toDoList_users.id
    WHERE toDoList_respUsersTasks.task_id=${id as string}
    `);

    const result: any = query[0][0];
    const resp: any = responsibles[0];
    const respArr = resp.map((user: any): any => {
      return { id: user.responsible_user_id, nickname: user.nickname };
    });
    res.status(200).send({
      taskId: result.id as string,
      title: result.title as string,
      description: result.description as string,
      limitDate: millisecondsToStrDate(result.limit_date) as string,
      status: result.status as string,
      creatorUserId: result.creator_user_id as string,
      creatorUserNickname: result.nickname as string,
      responsibleUsers: respArr as any
    });
  } catch (error) {
    res.status(errorCode).send({ message: error.message });
  }
};

export default getTaskById;
