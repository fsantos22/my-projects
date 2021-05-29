import connection from "../connection";

export default async function findDuplicate(
  table: string,
  columnName1: string,
  value1: string | number,
  columnName2: string,
  value2: string | number
): Promise<any> {
  const result = await connection.raw(
    `SELECT * 
    FROM ${table} 
    WHERE ${columnName1} = "${value1}" 
    AND ${columnName2} = "${value2}"`
  );
  return result[0][0];
}
