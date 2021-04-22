import BaseDB from "./BaseDB";
import { commentTDO, likeTDO, post } from "../models/posts";

export class PostsDB extends BaseDB {
  protected static tableName: string = "labook_posts";
  protected static usersTable: string = "labook_users";
  protected static likesTable: string = "labook_likes";
  protected static commentsTable: string = "labook_comments";
  protected static friendsTablePrefix: string = "labook_friends";

  async insertPost(post: post): Promise<void> {
    const { id, photo, description, createdAt, type, authorId } = post;
    try {
      await BaseDB.connection(PostsDB.tableName).insert({
        id,
        photo,
        description,
        created_at: createdAt,
        type,
        author_id: authorId,
      });
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getPostById(id: string): Promise<post> {
    try {
      const result: any = await BaseDB.connection(PostsDB.tableName)
        .select("*")
        .where({ id });
      return result[0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getFeed(id: string, page: number): Promise<post[]> {
    try {
      const limit:number = 5
      const offset: number = (page - 1) * limit | 0;
      const feed = await BaseDB.connection(
        `${PostsDB.friendsTablePrefix}_${id}`
      )
        .select(`${PostsDB.tableName}.*`)
        .limit(limit)
        .offset(offset)
        .innerJoin(PostsDB.tableName, function () {
          this.on(
            `${PostsDB.tableName}.author_id`,
            "=",
            `${PostsDB.friendsTablePrefix}_${id}.friend_id`
          );
        })
        .orderBy(`${PostsDB.tableName}.created_at`, "desc");
      return feed;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getPostsByType(type: string): Promise<post[]> {
    try {
      const feed = await BaseDB.connection(PostsDB.tableName)
        .select("*")
        .where({ type })
        .orderBy(`${PostsDB.tableName}.created_at`, "desc");
      return feed;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async insertLike(input: likeTDO): Promise<void> {
    try {
      const { postId, userId } = input;
      return await BaseDB.connection(PostsDB.likesTable).insert({
        post_id: postId,
        user_id: userId,
      });
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async checkLike(input: likeTDO): Promise<boolean> {
    try {
      const { postId, userId } = input;
      const like = await BaseDB.connection(PostsDB.likesTable)
        .select("*")
        .where({ post_id: postId })
        .andWhere({ user_id: userId });
      if (like.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async deleteLike(input: likeTDO): Promise<void> {
    try {
      const { postId, userId } = input;
      await BaseDB.connection(PostsDB.likesTable)
        .del()
        .where({ post_id: postId })
        .andWhere({ user_id: userId });
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async insertComment(input: commentTDO): Promise<void> {
    const { id, postId, comment, createdAt, authorId } = input;
    try {
      await BaseDB.connection(PostsDB.commentsTable).insert({
        id,
        post_id: postId,
        comment,
        created_at: createdAt,
        author_id: authorId
      });
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
