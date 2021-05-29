import { Request, Response } from "express";
import connection from "../../connection";

const getResponsiblesByTaskId = async (
  req: Request,
  res: Response
): Promise<void> => {
  let errorCode: number = 400;
  const { id } = req.params;
  try {
    const query: any = await connection.raw(`
      SELECT toDoList_respUsersTasks.*, toDoList_users.nickname
      FROM toDoList_respUsersTasks
      JOIN toDoList_users
      ON toDoList_respUsersTasks.responsible_user_id = toDoList_users.id
      WHERE task_id = ${id as string}
      `);
    if (query[0].length < 1) {
      errorCode = 404;
      throw new Error(`Task id ${id} not found.`);
    }
    const result: any = query[0];
    const users: any = result.map((user: any): any => {
      return {
        id: user.responsible_user_id as string,
        nickname: user.nickname as string,
      };
    });
    res.status(200).send({ users: users });
  } catch (error) {
    res.status(errorCode).send({ message: error.message });
  }
};

export default getResponsiblesByTaskId;
