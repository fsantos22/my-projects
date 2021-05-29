import connection from "../connection";

export default async function findData(
  table: string,
  columnName: string,
  value: string | number
): Promise<any> {
  const result = await connection.raw(`
  SELECT * 
  FROM ${table} 
  WHERE ${columnName} = "${value}"
  `);
  return result[0][0];
}
