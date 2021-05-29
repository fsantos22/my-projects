import { Request, Response } from "express";
import deleteClassAssignment from "../queries/deleteClassAssignment";
import deleteUser from "../queries/deleteUser";
import findData from "../queries/findData";

const removeStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  let errorCode: number = 400;
  try {
    const id = Number(req.params.id);

    // VALIDAÇÕES
    // Se id é um número
    if (isNaN(id)) {
      errorCode = 422;
      throw new Error(`Invalid id type`);
    }

    // Se o usuário existe
    const findStudent = await findData("student", "id", id);
    if (!findStudent) {
      errorCode = 404;
      throw new Error(`Student id '${id}' not found.`);
    }

    // Se já está inscrito em alguma turma
    const findClass = await findData("student_class", "student_id", id);
    if (findClass) {
      const classId = findClass.class_id;

      // Remove o aluno da turma
      await deleteClassAssignment("student", id, classId);
    }

    // Remove o aluno da base de dados
    await deleteUser("student", id);

    // Resposta para o usuário
    res.send({ message: "Student removed from database!" });
  } catch (error) {
    res.status(errorCode).send({ message: error.message || error.sqlMessage });
  }
};

export default removeStudent;
