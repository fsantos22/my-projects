import { Request, Response } from "express";
// import getStudentByClass from "../queries/getStudentByClass";
import getUserByClass from "../queries/getUserByClass";
import getHobbies from "../queries/getHobbies";

const getClassStudents = async (req: Request, res: Response): Promise<void> => {
  let errorCode: number = 400;
  try {
    // Parâmetros do query
    const classId = req.params.classId as string;

    // Requisição do banco de dados
    const user = await getUserByClass("student",classId)
    const hobbies = await getHobbies();
    const hobbiesGroup = hobbies.reduce((acc:any, item:any) => {
    acc[item.student_id] = acc[item.student_id] || [];
    acc[item.student_id].push(item.title);
    return acc;
  }, {});

    // Tratando as informações que devolverá ao usuário
    const students = user.map((student: any): any => {
      return {
        name: student.name,
        birthdate: student.birthdate.toLocaleDateString(),
        hobbies: hobbiesGroup[student.id]
      };
    });

    // Resposta para o usuário
    res.send(students);
  } catch (error) {
    res.status(errorCode).send({ message: error.message || error.sqlMessage });
  }
};

export default getClassStudents;
