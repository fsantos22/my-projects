import { Request, Response } from "express";
import findData from "../queries/findData";
import findDuplicate from "../queries/findDuplicate";
import insertHobbyToStudent from '../queries/insertHobbyToStudent'

const assignHobbyToStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  let errorCode: number = 400;
  try {
    const { id, hobbyId } = req.body;
    const body = ["id", "hobbyId"];

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

    // Se o valor inserido em 'hobbyId' é um número, inteiro e positivo
    if (isNaN(hobbyId) || hobbyId % 1 !== 0) {
      errorCode = 422;
      throw new Error("'hobbyId' must be a positive and integer number!");
    }

    // Se o info existe
    const findHobby = await findData("hobby", "id", hobbyId);
    if (!findHobby) {
      errorCode = 404;
      throw new Error(`Hobby id '${hobbyId}' not found.`);
    }

    //Se o regsitro já foi realizado
    const findRecord = await findDuplicate(
      "student_hobby",
      "student_id",
      id,
      "hobby_id",
      hobbyId
    );
    if (findRecord) {
      errorCode = 409;
      throw new Error("This assignment has already been made!");
    }

    // Insere as informações no Banco de Dados
    await insertHobbyToStudent(id, hobbyId);

    // Resposta para o usuário
    res.status(201).send({ message: "Hobby assigned" });
  } catch (error) {
    res.status(errorCode).send({ message: error.message || error.sqlMessage });
  }
};

export default assignHobbyToStudent;
