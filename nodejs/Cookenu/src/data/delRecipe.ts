import connection from "../connection";

const delRecipe = async (id: string): Promise<void> => {
  await connection("cookenu_recipes").delete().where({ recipe_id: id });
};

export default delRecipe;
