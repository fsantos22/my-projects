import { Request, Response } from "express";
import deleteClassAssignment from "../queries/deleteClassAssignment";
import findData from "../queries/findData";
import findDuplicate from "../queries/findDuplicate";

const removeStudentFromClass = async (
  req: Request,
  res: Response
): Promise<void> => {
  let errorCode: number = 400;
  try {
    const { id, classId } = req.params;

    // VALIDAÇÕES
    // Se o usuário existe
    const findStudent = await findData("student", "id", id);
    if (!findStudent) {
      errorCode = 404;
      throw new Error(`Student id '${id}' not found.`);
    }

    // Se a turma existe
    const findClass = await findData("class", "id", classId);
    if (!findClass) {
      errorCode = 404;
      throw new Error(`Class id '${classId}' not found.`);
    }

    //Se a relação existe
    const findRecord = await findDuplicate(
      "student_class",
      "student_id",
      id,
      "class_id",
      classId
    );
    if (!findRecord) {
      errorCode = 409;
      throw new Error("This student is not assigned to this class!");
    }

    await deleteClassAssignment("student", Number(id), Number(classId));
    res.send({ message: "Student removed from class!" });
  } catch (error) {
    res.status(errorCode).send({ message: error.message || error.sqlMessage });
  }
};

export default removeStudentFromClass;
