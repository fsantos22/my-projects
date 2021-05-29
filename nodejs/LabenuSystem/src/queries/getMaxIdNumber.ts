import connection from "../connection";

export default async function getMaxIdNumber(table: string): Promise<any> {
  const result = await connection.raw(`
      SELECT MAX(id) 
      FROM ${table};
   `);
  if (result[0].length < 1) {
    return 0;
  } else {
    return result[0][0];
  }
}
