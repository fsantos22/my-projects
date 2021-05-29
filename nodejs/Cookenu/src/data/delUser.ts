import connection from "../connection";

const delUser = async (id: string): Promise<void> => {
  await connection.raw(`DELETE FROM cookenu_users WHERE user_id = "${id}"`); 
};

export default delUser;
