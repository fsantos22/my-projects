import connection from "../connection";

const showFeed = async (followingTableName:string): Promise<void> => {
  const result = await connection.raw(`
    SELECT cookenu_recipes.recipe_id, cookenu_recipes.user_id, cookenu_users.name as username, cookenu_recipes.title, cookenu_recipes.description, DATE_FORMAT(cookenu_recipes.createdAt, "%d/%m/%Y") as created FROM cookenu_recipes
    JOIN ${followingTableName}
    ON cookenu_recipes.user_id = ${followingTableName}.user_id
    JOIN cookenu_users
    ON cookenu_users.user_id = cookenu_recipes.user_id
  `);
  return result[0]
};

export default showFeed;
