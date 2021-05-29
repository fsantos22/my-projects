import connection from '../connection';

export default async function getStudentProfile(id:number): Promise<any> {
  const result = await connection.raw(`
      SELECT id, name, birthdate 
      FROM student 
      WHERE id = ${id}
   `);

  return result[0][0];
}
