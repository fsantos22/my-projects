import connection from "../connection";

const unfollow = async (
  followingTable: string,
  following_id: string,
  followersTable: string,
  follower_id: string
): Promise<void> => {
  await connection.raw(`
  DELETE FROM ${followingTable}
  WHERE user_id = "${following_id}"
  `);

  await connection.raw(`
  DELETE FROM ${followersTable}
  WHERE user_id = "${follower_id}"
  `);
};

export default unfollow;
