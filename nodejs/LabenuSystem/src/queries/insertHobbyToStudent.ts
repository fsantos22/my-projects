import connection from "../connection";

export default async function insertHobbyToStudent(
  studentId: number,
  hobbyId: number
): Promise<any> {
  await connection.raw(
    `
    INSERT 
    INTO student_hobby (student_id, hobby_id)
    VALUES
    ("${studentId}", "${hobbyId}")
    `
  );
}
