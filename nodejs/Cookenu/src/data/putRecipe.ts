import connection from "../connection";

const putRecipe = async (
  id: string,
  title: string,
  description: string
): Promise<void> => {
  await connection("cookenu_recipes")
    .update({ title, description })
    .where({ user_id: id });
};

export default putRecipe;
