import connection from "../connection";

export default async function getUserByClass(table:string, classId: string): Promise<any> {
  const result = await connection.raw(`
  SELECT *
  FROM ${table}
  JOIN ${table}_class
  ON ${table}.id = ${table}_class.${table}_id
  WHERE ${table}_class.class_id = "${classId}"
  `);

  return result[0];
}
