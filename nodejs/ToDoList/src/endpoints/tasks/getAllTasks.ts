import { Request, Response } from "express";
import { millisecondsToStrDate } from "../../functions/date";
import connection from "./../../connection";

const getAllTasks = async (req: Request, res: Response): Promise<void> => {
  let errorCode: number = 400;
  try {
    const query: any = await connection.raw(`
    SELECT 
    toDoList_tasks.*,
    toDoList_users.nickname 
    FROM toDoList_tasks 
    JOIN toDoList_users 
    ON toDoList_tasks.creator_user_id = toDoList_users.id
    `);

    const responsibles: any = await connection.raw(`SELECT 
    toDoList_respUsersTasks.*,
    toDoList_users.nickname 
    FROM toDoList_respUsersTasks 
    JOIN toDoList_users 
    ON toDoList_respUsersTasks.responsible_user_id = toDoList_users.id
    `);

    const result: any = query[0];
    const resp: any = responsibles[0];
    const resultArr: any = result.map((task: any): any => {
      let respArr = resp.map((user: any): any => {
        if (user.task_id === task.id) {
          return { id: user.responsible_user_id, nickname: user.nickname };
        }
      });
      respArr = respArr.filter((item: any): any => {
        return !!item
      });
      return {
        taskId: task.id as string,
        title: task.title as string,
        description: task.description as string,
        limitDate: millisecondsToStrDate(task.limit_date) as string,
        status: task.status as string,
        creatorUserId: task.creator_user_id as string,
        creatorUserNickname: task.nickname as string,
        responsibleUsers: respArr as any,
      };
    });
    res.status(200).send({
      result: resultArr,
    });
  } catch (error) {
    res.status(errorCode).send({ message: error.message });
  }
};

export default getAllTasks;
