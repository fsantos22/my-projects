import connection from "../connection";

const getUserByEmail = async (email: string): Promise<any> => {
  const result = await connection.raw(`
  SELECT *
  FROM cookenu_users 
  WHERE email = "${email}"
  `);

  return result[0][0];
};

export default getUserByEmail;
