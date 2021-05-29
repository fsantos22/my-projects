import { Request, Response } from "express";
import insertClass from "../queries/insertClass";
import { strDateToDate } from "./../functions/strDateToDate";
import { dateDiff } from "../functions/dateDiff";
import { checkDate } from "./../functions/checkDate";
import { createId } from "./../functions/createId";
import { classBody, classBodyType } from "../types/classBody";
import findData from "../queries/findData";

const addClass = async (req: Request, res: Response): Promise<void> => {
  let errorCode: number = 400;
  try {
    // Parâmetros do Body
    const {
      name,
      period,
      startDate,
      endDate,
      module,
    } = req.body as classBodyType;

    // Gera id
    const id: number = await createId("class");

    // Converte as datas de string para Date format
    const convStartDate: Date = strDateToDate(startDate);
    const convEndDate: Date = strDateToDate(endDate);

    // VALIDAÇÕES
    // Se existe campo vazio ou ausente do body
    for (let item in classBody) {
      if (!(item in req.body)) {
        errorCode = 422;
        throw new Error(`'${item}' field is missing.`);
      }
    }

    // Se nome tem menos de 3 caracteres
    if (name.length < 3) {
      errorCode = 422;
      throw new Error("Name must be at least 3 characters.");
    }

    // Se nome já foi registrado
    const findClass = await findData("class", "name", name);
    if (findClass) {
      errorCode = 422;
      throw new Error(`class '${name}' is already registered!`);
    }

    // Se a categoria é válida
    if (
      period.toLowerCase() !== "noturno" &&
      period.toLowerCase() !== "integral"
    ) {
      errorCode = 422;
      throw new Error(`'period' options are: 'Noturno' or 'Integral'.`);
    }

    // Se a turma for noturna, adiciona '-na-night' no nome
    let modName: string = name;
    if (period.toLowerCase() === "noturno") {
      modName = name + "-na-night";
    }

    // Se o fomrato de data do usuário é DD/MM/YYYY
    if (!checkDate(startDate) || !checkDate(endDate)) {
      errorCode = 422;
      throw new Error(`invalid date type. Use the format DD/MM/YYYY`);
    }

    // Se data de fim é maior que data de início
    if (dateDiff(convStartDate, convEndDate) < 0) {
      errorCode = 422;
      throw new Error("'endDate' must be greater than 'startDate'!");
    }

    // Se a data de fim do curso é superior ao dia atual
    if (dateDiff(new Date(), convEndDate) < 0) {
      errorCode = 422;
      throw new Error("'endDate' must be greater than 'today's date'!");
    }

    // Se o valor inserido é um número, inteiro, positivo e entre 0 e 7
    if (isNaN(module) || module % 1 !== 0 || module < 0 || module > 7) {
      errorCode = 422;
      throw new Error(
        "'module' must be a positive and integer number between 0 and 7!"
      );
    }

    // Insere as informações no Banco de Dados
    await insertClass(id, modName, startDate, endDate, module);

    // Resposta para o usuário
    res
      .status(201)
      .send({ message: `Class '${name}' has been successfully registered!` });
  } catch (error) {
    res.status(errorCode).send({ message: error.message || error.sqlMessage });
  }
};

export default addClass;
