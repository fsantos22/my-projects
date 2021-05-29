import connection from "../connection";

export default async function getStudentByClass(classId: string): Promise<any> {
  const result = await connection.raw(`
  SELECT student.id, student.name, student.birthdate, student_class.class_id, student_hobby.hobby_id, hobby.title
  FROM student_class
  JOIN student
  ON student_class.student_id = student.id
  LEFT JOIN student_hobby
  ON student.id = student_hobby.student_id
  LEFT JOIN hobby
  ON student_hobby.hobby_id = hobby.id 
  WHERE student_class.class_id = ${classId}
  `);

  return result[0];
}
