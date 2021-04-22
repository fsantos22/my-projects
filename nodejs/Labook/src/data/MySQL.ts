import BaseDB from "./BaseDB";

export class MySQL extends BaseDB {
  async insertPost(): Promise<void> {
    try {
      await BaseDB.connection.raw(`
            CREATE TABLE labook_users
            (
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                role ENUM("normal", "admin") DEFAULT ("normal")
            );
            `);
        
        await BaseDB.connection.raw(`
            CREATE TABLE labook_posts(
                id VARCHAR(255) PRIMARY KEY,
                photo VARCHAR(255) NOT NULL,
                description VARCHAR(255) NOT NULL,
                type ENUM("normal", "event") DEFAULT ("normal"),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
                author_id VARCHAR(255),
                FOREIGN KEY (author_id) REFERENCES labook_users(id)
                ON DELETE CASCADE 
            );
            `);
        
        await BaseDB.connection.raw(`
            CREATE TABLE labook_likes(
                post_id VARCHAR(255) NOT NULL,
                user_id VARCHAR(255) NOT NULL,
                FOREIGN KEY (post_id) REFERENCES labook_posts(id),
                FOREIGN KEY (user_id) REFERENCES labook_users(id)
                ON DELETE CASCADE
            );
            `);
        
        await BaseDB.connection.raw(`
            CREATE TABLE labook_comments(
                id VARCHAR(255) PRIMARY KEY,
                post_id VARCHAR(255) NOT NULL,
                comment VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
                author_id VARCHAR(255) NOT NULL,
                FOREIGN KEY (post_id) REFERENCES labook_posts(id),
                FOREIGN KEY (author_id) REFERENCES labook_users(id)
                ON DELETE CASCADE
            );
            `);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
