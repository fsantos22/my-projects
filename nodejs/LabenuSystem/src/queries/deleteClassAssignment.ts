import connection from "../connection";

export default async function deleteClassAssignment(
  category: string,
  userId: number,
  classId: number
): Promise<any> {
  await connection.raw(`
  DELETE FROM ${category}_class
  WHERE ${category}_id = ${userId}
  AND class_id = ${classId}
  `);
}
