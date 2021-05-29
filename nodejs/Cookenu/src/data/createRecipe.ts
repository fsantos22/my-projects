import connection from "../connection";

const createRecipe = async (
  recipeId: string,
  userId: string,
  title: string,
  description: string,
  createdAt: number
): Promise<void> => {
  await connection.raw(`
  INSERT INTO cookenu_recipes(recipe_id, user_id, title, description, createdAt)
  VALUES
  ("${recipeId}", "${userId}", "${title}", "${description}", FROM_UNIXTIME(${createdAt}))
  `);
};

export default createRecipe;

