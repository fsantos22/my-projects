import connection from "../connection";

export default async function deleteUser(category:string, id:number): Promise<any> {
  await connection.raw(`
  DELETE FROM ${category}
  WHERE id = ${id}
  `);
}
