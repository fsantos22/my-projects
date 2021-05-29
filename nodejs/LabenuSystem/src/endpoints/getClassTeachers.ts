import { Request, Response } from "express";
import getSpecs from "../queries/getSpecs";
import getUserByClass from "../queries/getUserByClass";

const getClassTeachers = async (req: Request, res: Response): Promise<void> => {
  let errorCode: number = 400;
  try {
    // Parâmetros do query
    const classId = req.params.classId as string;

    // Requisição do banco de dados
    const user = await getUserByClass("teacher", classId);
    const specs = await getSpecs();
    const specsGroup = specs.reduce((acc: any, item: any) => {
      acc[item.teacher_id] = acc[item.teacher_id] || [];
      acc[item.teacher_id].push(item.title);
      return acc;
    }, {});

    // Tratando as informações que devolverá ao usuário
    const teachers = user.map((teacher: any): any => {
      return {
        name: teacher.name,
        birthdate: teacher.birthdate.toLocaleDateString(),
        specialities: specsGroup[teacher.id],
      };
    });

    // Resposta para o usuário
    res.send({ teachers: teachers });
  } catch (error) {
    res.status(errorCode).send({ message: error.message || error.sqlMessage });
  }
};

export default getClassTeachers;
