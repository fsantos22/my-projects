import { Request, Response } from "express";
import connection from "../../connection";
import { strDateToMilliseconds } from "../../functions/date";
import { validateDate } from "../../functions/date";

const createTask = async (req: Request, res: Response): Promise<void> => {
  let errorCode: number = 400;
  const { title, description, limitDate, creatorUserId } = req.body as any;
  try {
    for (let key in req.body) {
      if (req.body[key] === "") {
        errorCode = 422;
        throw new Error(`'${key}' is not filled.`);
      }
    }
    if (!title || !description || !limitDate || !creatorUserId) {
      errorCode = 404;
      throw new Error(
        "'title','description' 'limitDate' and 'creatorUserId' are mandatory fields in body."
      );
    }
    if (title.length < 3) {
      errorCode = 422;
      throw new Error("Title must be at least 3 characters.");
    }
    const findTitle = await connection("toDoList_tasks").where({
      title: req.body.title,
    });
    if (findTitle.length > 0) {
      errorCode = 409;
      throw new Error("This task title already exists.");
    }
    if (description.length < 10) {
      errorCode = 422;
      throw new Error("Description must be at least 10 characters.");
    }
    if (!validateDate(limitDate)) {
      errorCode = 422;
      throw new Error("Invalid date type. Use the format DD/MM/YYYY");
    }
    const users = await connection("toDoList_users");
    const findId = users.find((usr) => usr.id == creatorUserId);
    if (!findId) {
      errorCode = 409;
      throw new Error("User's id not found.");
    }
    if (strDateToMilliseconds(limitDate) < Number(Date.now())) {
      errorCode = 422;
      throw new Error("Limit date must be greater than todays'date.");
    }
    await connection("toDoList_tasks").insert({
      id: Date.now() as number,
      title: title as string,
      description: description as string,
      status: "to_do",
      limit_date: strDateToMilliseconds(limitDate) as number,
      creator_user_id: creatorUserId as string,
    });
    res.status(201).send("Task successfully created!");
  } catch (error) {
    res.status(errorCode).send({ message: error.message });
  }
};

export default createTask;
