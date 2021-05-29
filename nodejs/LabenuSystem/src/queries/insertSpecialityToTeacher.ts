import connection from "../connection";

export default async function insertSpecialityToTeacher(
  teacherId: number,
  specialityId: number
): Promise<any> {
  await connection.raw(
    `
    INSERT 
    INTO teacher_speciality (teacher_id, speciality_id)
    VALUES
    ("${teacherId}", "${specialityId}")
    `
  );
}
