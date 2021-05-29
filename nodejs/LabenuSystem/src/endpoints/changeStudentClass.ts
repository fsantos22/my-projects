import { Request, Response } from "express";
import editUserClass from "../queries/editUserClass";
import findData from "../queries/findData";
import findDuplicate from "../queries/findDuplicate";

const changeStudentClass = async (
  req: Request,
  res: Response
): Promise<void> => {
  let errorCode: number = 400;
  try {
    const { id, classId } = req.body;
    const body = ["id", "classId"];

    // VALIDAÇÕES
    // Se existe campo vazio ou ausente do body
    body.forEach((item) => {
      if (!(item in req.body)) {
        errorCode = 422;
        throw new Error(`'${item}' field is missing.`);
      }
    });

    // Se o valor inserido em 'id' é um número, inteiro e positivo
    if (isNaN(id) || id % 1 !== 0) {
      errorCode = 422;
      throw new Error("'id' must be a positive and integer number!");
    }

    // Se o usuário existe
    const findStudent = await findData("student", "id", id);
    if (!findStudent) {
      errorCode = 404;
      throw new Error(`Student id '${id}' not found.`);
    }

    // Se o valor inserido em 'classId' é um número, inteiro e positivo
    if (isNaN(classId) || classId % 1 !== 0) {
      errorCode = 422;
      throw new Error("'classId' must be a positive and integer number!");
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
    if (findRecord) {
      errorCode = 409;
      throw new Error("This student is already assigned to this class!");
    }

    // Edita informação
    await editUserClass("student", id, classId);

    // Resposta para o usuário
    res.send({ message: "Class successfully modified!" });
  } catch (error) {
    res.status(errorCode).send({ message: error.message || error.sqlMessage });
  }
};

export default changeStudentClass;
