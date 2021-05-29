import { Request, Response } from "express";
import insertInfo from "../queries/insertInfo";
import findData from "../queries/findData";
import { createId } from "../functions/createId";

const addSpeciality = async (req: Request, res: Response): Promise<void> => {
  let errorCode: number = 400;
  try {
    // Parâmetros do Body
    const title: string = req.body.title;

    // Gera id
    const id: number = await createId("teacher");

    // VALIDAÇÕES
    // Se existe campo vazio ou ausente do body
    if (!title) {
      errorCode = 422;
      throw new Error("'title' is mandatory in body.");
    }

    // Se o título é uma palavra e tem menos de 3 caracteres
    if (!/^[A-Za-z]+$/.test(title)) {
      errorCode = 422;
      throw new Error("'title' must be a word.");
    }
    if (title.length < 3) {
      errorCode = 422;
      throw new Error("'title' must be at least 3 characters.");
    }

    // Se a especialidade já foi cadastrada
    const findSpeciality: any = await findData("speciality", "title", title);
    if (findSpeciality.length > 0) {
      errorCode = 409;
      throw new Error(`Speciality '${title}' is already registered!`);
    }

    // Insere as informações no Banco de Dados
    await insertInfo("speciality", id, title);

    // Resposta para o usuário
    res.status(201).send({ message: "Speciality registered!" });
  } catch (error) {
    res.status(errorCode).send({ message: error.message || error.sqlMessage });
  }
};

export default addSpeciality;
