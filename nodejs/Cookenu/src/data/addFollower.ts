import connection from "../connection";

const addFollower = async (
  tableName: string,
  relId: string,
  userId: string
): Promise<void> => {
  await connection.raw(`
  INSERT INTO ${tableName}
  VALUES("${relId}", "${userId}")
  `);
};

export default addFollower;
