import connection from "../connection";

const getUserById = async (id: string): Promise<any> => {
  const result = await connection.raw(`
  SELECT user_id, name, email
  FROM cookenu_users 
  WHERE user_id = "${id}"
  `);

  return result[0][0];
};

export default getUserById;
