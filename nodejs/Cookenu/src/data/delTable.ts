import connection from "../connection";

const delTable = async (id: string): Promise<void> => {
  await connection.schema.dropTable(`cookenu_following_${id}`);
};

export default delTable;
