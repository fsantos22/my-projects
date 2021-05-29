import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  public async creatTables(): Promise<void> {
    try {
      await this.getConnection().raw(`
      CREATE TABLE lama_users (
          user_id VARCHAR(255) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          role ENUM('NORMAL', 'ADMIN') DEFAULT 'NORMAL'
      )
      `);

      await this.getConnection().raw(`
      CREATE TABLE lama_bands (
          band_id VARCHAR(255) PRIMARY KEY,
          name VARCHAR(255) NOT NULL UNIQUE,
          genre VARCHAR(255) NOT NULL,
          responsible VARCHAR(255) NOT NULL
      )
      `);

      await this.getConnection().raw(`
      CREATE TABLE lama_shows (
          show_id VARCHAR(255) PRIMARY KEY,
          band_id VARCHAR(255) NOT NULL UNIQUE,
          day ENUM('FRIDAY', 'SATURDAY', 'SUNDAY'),
          start_time INT NOT NULL,
          end_time INT NOT NULL,
          FOREIGN KEY (band_id) REFERENCES lama_bands(band_id)
      )
      `);

      await this.getConnection().raw(`CREATE TABLE lama_tickets (
      ticket_id VARCHAR(255) PRIMARY KEY,
      ticket_name VARCHAR(255),
      show_id VARCHAR(255) NOT NULL,
      price FLOAT NOT NULL,
      total_tickets INT NOT NULL,
      avaliable_tickets INT NOT NULL,
      sold_tickets INT DEFAULT 0,
      FOREIGN KEY (show_id) REFERENCES lama_shows(show_id)
      )`);

      await this.getConnection().raw(`CREATE TABLE lama_sold_tickets (
      user_ticket_id VARCHAR(255) PRIMARY KEY,
      ticket_id VARCHAR(255) NOT NULL,
      user_id VARCHAR(255) NOT NULL,
      quantity INT NOT NULL,
      FOREIGN KEY (ticket_id) REFERENCES lama_tickets(ticket_id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES lama_users(user_id)
      )`);

      console.log("TABLES CREATED")
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
