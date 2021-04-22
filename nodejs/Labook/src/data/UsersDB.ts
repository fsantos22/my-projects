import BaseDB from "./BaseDB";
import { friend, user } from "../models/users";
import { friendship, findFriendInput } from "./../models/users";

export class UsersDB extends BaseDB {
  protected static tableName: string = "labook_users";
  protected static postsTable: string = "labook_posts";
  protected static friendsTablePrefix: string = "labook_friends";

  async insertUser(user: user): Promise<void> {
    const { id, name, email, password, role } = user;
    try {
      await BaseDB.connection(UsersDB.tableName).insert({
        id,
        name,
        email,
        password,
        role,
      });
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getUserByEmail(email: string): Promise<user> {
    try {
      const result: any = await BaseDB.connection(UsersDB.tableName)
        .select("*")
        .where({ email });
      return result[0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getUserById(id: string): Promise<user> {
    try {
      const result: any = await BaseDB.connection(UsersDB.tableName)
        .select("*")
        .where({ id });
      return result[0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getFriendsTable(id: string): Promise<string> {
    try {
      const result = await BaseDB.connection.raw(`
        SELECT TABLE_NAME 
        FROM information_schema.TABLES
        WHERE TABLE_TYPE = 'BASE TABLE'
        AND TABLE_NAME = '${UsersDB.friendsTablePrefix}_${id}'
      `);
      return result[0][0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async createFriendsTable(id: string): Promise<void> {
    try {
      return await BaseDB.connection.raw(`
      CREATE TABLE ${UsersDB.friendsTablePrefix}_${id} 
      (
        id VARCHAR(255) PRIMARY KEY,
        friend_id VARCHAR(255) NOT NULL UNIQUE,
        FOREIGN KEY (friend_id) REFERENCES labook_users(id)
        ON DELETE CASCADE
        )
      `);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getFriendById(friendship: findFriendInput): Promise<friend> {
    try {
      const { userId, friendId } = friendship;
      const result: any = await BaseDB.connection(
        `${UsersDB.friendsTablePrefix}_${userId}`
      )
        .select("*")
        .where({ friend_id: friendId });
      return result[0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async makeFriendship(friendship: friendship): Promise<void> {
    try {
      const { id, userId, friendId } = friendship;
      await BaseDB.connection(`${UsersDB.friendsTablePrefix}_${userId}`).insert(
        {
          id,
          friend_id: friendId,
        }
      );

      await BaseDB.connection(
        `${UsersDB.friendsTablePrefix}_${friendId}`
      ).insert({
        id,
        friend_id: userId,
      });
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async undoFriendship(friendship: friendship): Promise<void> {
    try {
      const { id, userId, friendId } = friendship;

      await BaseDB.connection(`${UsersDB.friendsTablePrefix}_${userId}`)
        .delete()
        .where({ id });

      await BaseDB.connection(`${UsersDB.friendsTablePrefix}_${friendId}`)
        .delete()
        .where({ id });

      // Se a tabela estiver vazia, excluir
      const tbSize1 = await BaseDB.connection.raw(
        `SELECT COUNT(*) as count FROM ${UsersDB.friendsTablePrefix}_${userId}`
      );
      const rows1: number = tbSize1[0][0].count;
      if (rows1 < 1) {
        await BaseDB.connection.raw(
          `DROP TABLE ${UsersDB.friendsTablePrefix}_${userId}`
        );
      }

      const tbSize2 = await BaseDB.connection.raw(
        `SELECT COUNT(*) as count FROM ${UsersDB.friendsTablePrefix}_${friendId}`
      );
      const rows2: number = tbSize2[0][0].count;
      if (rows2 < 1) {
        await BaseDB.connection.raw(
          `DROP TABLE ${UsersDB.friendsTablePrefix}_${friendId}`
        );
      }
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
