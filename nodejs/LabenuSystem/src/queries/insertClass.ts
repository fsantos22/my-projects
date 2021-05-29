import connection from "../connection";

export default async function insertClass(
  id: number,
  name: string,
  startDate: string,
  endDate: string,
  module: number
): Promise<any> {
  await connection.raw(`
  INSERT INTO class (id, name, start_date, end_date, module)
  VALUES
  (${id}, "${name}", str_to_date("${startDate}", '%d/%m/%Y'), str_to_date("${endDate}", '%d/%m/%Y'), ${module})
  `);
}
