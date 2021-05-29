import connection from "../connection";

export default async function insertInfo(
  table: string,
  id: number,
  title: string
): Promise<any> {
  await connection.raw(`
  INSERT INTO ${table} (id, title)
  VALUES
  (${id}, "${title}")
  `);
}
