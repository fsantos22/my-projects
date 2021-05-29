import { Request, Response } from "express";
import deleteClassAssignment from "../queries/deleteClassAssignment";
import findData from "../queries/findData";
import findDuplicate from "../queries/findDuplicate";

const removeTeacherFromClass = async (
  req: Request,
  res: Response
): Promise<void> => {
  let errorCode: number = 400;
  try {
    const { id, classId } = req.params;

    // VALIDAÇÕES
    // Se o usuário existe
    const findTeacher = await findData("teacher", "id", id);
    if (!findTeacher) {
      errorCode = 404;
      throw new Error(`Teacher id '${id}' not found.`);
    }

    // Se a info existe
    const findHobby = await findData("hobby", "id", classId);
    if (!findHobby) {
      errorCode = 404;
      throw new Error(`Hobby id '${classId}' not found.`);
    }

    //Se a relação existe
    const findRecord = await findDuplicate(
      "teacher_class",
      "teacher_id",
      id,
      "class_id",
      classId
    );
    if (findRecord) {
      errorCode = 409;
      throw new Error("This teacher is not assigned to this class!");
    }

    await deleteClassAssignment("teacher", Number(id), Number(classId));
    res.send({ message: "Teacher removed from class!" });
  } catch (error) {
    res.status(errorCode).send({ message: error.message || error.sqlMessage });
  }
};

export default removeTeacherFromClass;
