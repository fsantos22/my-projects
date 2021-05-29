import { Request, Response } from "express";
import findData from "../queries/findData";
import { findAge } from "../functions/findAge";
import getSpecs from "../queries/getSpecs";

const getTeacherAge = async (req: Request, res: Response): Promise<void> => {
  let errorCode: number = 400;
  try {
    // Parâmetro do path
    const id: number = Number(req.params.id);

    // Pegando usuário no banco de dados
    const profile: any = await findData("teacher", "id", id);

    if (!profile) {
      errorCode = 404;
      throw new Error("Teacher not found.");
    }
    
    const specs = await getSpecs();
    const specsGroup = specs.reduce((acc: any, item: any) => {
      acc[item.teacher_id] = acc[item.teacher_id] || [];
      acc[item.teacher_id].push(item.title);
      return acc;
    }, {});

    // Calculando idade pela data de nascimento
    const age: number = findAge(profile.birthdate);

    // Resposta para o usuário
    res.status(200).send({
      user: {
        name: profile.name,
        age: age,
        hobbies: specsGroup[profile.id],
      },
    });
  } catch (error) {
    res.status(errorCode).send({ message: error.message || error.sqlMessage });
  }
};

export default getTeacherAge;
