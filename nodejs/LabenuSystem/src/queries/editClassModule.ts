import connection from "../connection";

export default async function editClassModule(
  id: number,
  module: number
): Promise<any> {
  await connection.raw(`
  UPDATE class
  SET module = ${module}
  WHERE id = ${id} 
  `);
}
