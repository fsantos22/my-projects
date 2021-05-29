import getMaxIdNumber from "../queries/getMaxIdNumber";

export const createId = async (table: string) => {
  const getMaxId = await getMaxIdNumber(table);
  const maxId = Object.values(getMaxId);
  const newId =  Number(maxId[0]) + 1;
  return newId;
};
