import connection from "../connection";

export default async function insertUser(
  table: string,
  id: number,
  name: string,
  email: string,
  birthdate: string
): Promise<any> {
  await connection.raw(`
  INSERT INTO ${table} (id, name, email, birthdate)
  VALUES
  (${id}, "${name}", "${email}", str_to_date("${birthdate}", '%d/%m/%Y'))
  `);
}
