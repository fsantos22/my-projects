import { Request, Response } from "express";
import findData from "../queries/findData";
import insertUserToClass from "../queries/insertUserToClass";
import findDuplicate from "../queries/findDuplicate";

const addTeacherToClass = async (req: Request, res: Response): Promise<void> => {
  let errorCode: number = 400;
  try {
    // Parâmetros do Body
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

    //Se o id está na base de usuário selecionada
    const findUser = await findData("teacher", "id", id);
    if (!findUser) {
      errorCode = 404;
      throw new Error(`User id ${id} not found.`);
    }

    // Se o valor inserido em 'classId' é um número, inteiro e positivo
    if (isNaN(classId) || classId % 1 !== 0) {
      errorCode = 422;
      throw new Error("'classId' must be a positive and integer number!");
    }

    //Se o id está na base de turmas
    const findClass = await findData("class", "id", classId);
    if (!findClass) {
      errorCode = 404;
      throw new Error(`Class id ${id} not found.`);
    }

    //Se a relaçao usuário-turma já foi cadastrada
    const findRecord = await findDuplicate(
      "teacher_class",
      "teacher_id",
      id,
      "class_id",
      classId
    );
    if (findRecord) {
      errorCode = 409;
      throw new Error(`This register has already been made.`);
    }

    //Insere as informações no Banco de Dados
    await insertUserToClass("teacher", id, classId);

    //Resposta para o usuário
    res.send({
      message: `Teacher ${findUser.name} assigned to class ${findClass.name}!`,
    });
  } catch (error) {
    res.status(errorCode).send({ message: error.message || error.sqlMessage });
  }
};

export default addTeacherToClass;
