import connection from "../connection";

export default async function getHobbies(): Promise<any> {
  const result = await connection.raw(`
  SELECT student_hobby.*, hobby.title 
  FROM student_hobby
  JOIN student
  ON student_hobby.student_id = student.id
  JOIN hobby
  ON student_hobby.hobby_id = hobby.id
  `);

  return result[0];
}
