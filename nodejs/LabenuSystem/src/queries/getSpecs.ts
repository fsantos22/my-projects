import connection from "../connection";

export default async function getSpecs(): Promise<any> {
  const result = await connection.raw(`
  SELECT teacher_speciality.*, speciality.title 
  FROM teacher_speciality
  JOIN teacher
  ON teacher_speciality.teacher_id = teacher.id
  JOIN speciality
  ON teacher_speciality.speciality_id = speciality.id
  `);

  return result[0];
}
