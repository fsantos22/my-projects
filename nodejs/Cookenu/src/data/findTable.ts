import connection from "../connection";

const findTable = async (tableName:string): Promise<{}> => {
  const result = await connection.raw(`
  SELECT TABLE_NAME 
  FROM information_schema.TABLES
  WHERE TABLE_SCHEMA = SCHEMA()
  AND TABLE_NAME = '${tableName}'
  `);
  return result[0][0]
};

export default findTable;
