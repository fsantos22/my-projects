import { Request, Response } from "express";
import findData from "../queries/findData";
import getHobbies from "../queries/getHobbies";
import { findAge } from "./../functions/findAge";

const getStudentAge = async (req: Request, res: Response): Promise<void> => {
  let errorCode: number = 400;
  try {
    // Parâmetro do path
    const id: number = Number(req.params.id);

    // Pegando usuário no banco de dados
    const profile: any = await findData("student", "id", id);

    if (!profile) {
      errorCode = 404;
      throw new Error("Student not found.");
    }

    const hobbies = await getHobbies();
    const hobbiesGroup = hobbies.reduce((acc: any, item: any) => {
      acc[item.student_id] = acc[item.student_id] || [];
      acc[item.student_id].push(item.title);
      return acc;
    }, {});

    // Calculando idade pela data de nascimento
    const age: number = findAge(profile.birthdate);

    // Resposta para o usuário
    res
      .status(200)
      .send({
        user: {
          name: profile.name,
          age: age,
          hobbies: hobbiesGroup[profile.id],
        },
      });
  } catch (error) {
    res.status(errorCode).send({ message: error.message || error.sqlMessage });
  }
};

export default getStudentAge;
