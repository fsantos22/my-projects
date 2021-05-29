import { Request, Response } from "express";
import findData from "../queries/findData";
import findDuplicate from "../queries/findDuplicate";
import insertSpecialityToTeacher from "../queries/insertSpecialityToTeacher";

const assignSpecialityToTeacher = async (
  req: Request,
  res: Response
): Promise<void> => {
  let errorCode: number = 400;
  try {
    const { id, specialityId } = req.body;
    const body = ["id", "specialityId"];

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
    const findUser = await findData("teacher", "id", id);
    if (!findUser) {
      errorCode = 404;
      throw new Error(`Teacher id '${id}' not found.`);
    }

    // Se o valor inserido em 'specialityId' é um número, inteiro e positivo
    if (isNaN(specialityId) || specialityId % 1 !== 0) {
      errorCode = 422;
      throw new Error("'specialityId' must be a positive and integer number!");
    }

    // Se o info existe
    const findInfo = await findData("speciality", "id", specialityId);
    if (!findInfo) {
      errorCode = 404;
      throw new Error(`Speciality id '${specialityId}' not found.`);
    }

    //Se o regsitro já foi realizado
    const findRecord = await findDuplicate(
      "teacher_speciality",
      "teacher_id",
      id,
      "speciality_id",
      specialityId
    );
    if (findRecord) {
      errorCode = 409;
      throw new Error("This assignment has already been made!");
    }

    // Insere as informações no Banco de Dados
    await insertSpecialityToTeacher(id, specialityId);

    // Resposta para o usuário
    res.status(201).send({ message: "Speciality assigned!" });
  } catch (error) {
    res.status(errorCode).send({ message: error.message || error.sqlMessage });
  }
};

export default assignSpecialityToTeacher;
