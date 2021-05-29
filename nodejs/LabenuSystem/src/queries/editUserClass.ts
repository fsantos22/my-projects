import connection from "../connection";

export default async function editUserClass(
  category: string,
  id: number,
  classId: number
): Promise<any> {
  await connection.raw(`
  UPDATE ${category}_class
  SET class_id = ${classId}
  WHERE ${category}_id = ${id} 
  `);
}
