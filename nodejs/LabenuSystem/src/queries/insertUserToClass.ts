import connection from "../connection";

export default async function insertUserToClass(
  table: string,
  userId: number,
  classId: number
): Promise<any> {
  await connection.raw(
    `
    INSERT 
    INTO ${table}_class (${table}_id, class_id)
    VALUES
    ("${userId}", "${classId}")
    `
  );
}
