import connection from "../connection";

const createUser = async (
  userId: string,
  name: string,
  email: string,
  password: string,
  role: string
): Promise<void> => {
  return await connection.raw(`
  INSERT INTO cookenu_users(user_id, name, email, password, role) 
  VALUES
  ("${userId}","${name}","${email}","${password}","${role}")
  `);
};

export default createUser;
