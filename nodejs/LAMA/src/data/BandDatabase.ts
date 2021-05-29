import { BaseDatabase } from "./BaseDatabase";
import { Band } from "../model/Band";

export class BandDatabase extends BaseDatabase {
  private static TABLE_NAME = "lama_bands";

  public async registerBand(band: Band): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          band_id: band.getId(),
          name: band.getName(),
          genre: band.getGenre(),
          responsible: band.getResponsible(),
        })
        .into(BandDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getBandById(id: string): Promise<Band | undefined> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(BandDatabase.TABLE_NAME)
        .where({ band_id: id });
      return Band.toBandModel(result[0]);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getBandByName(name: string): Promise<Band | undefined> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(BandDatabase.TABLE_NAME)
        .where({ name });
      return Band.toBandModel(result[0]);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getAllBands(): Promise<(Band | undefined)[]> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(BandDatabase.TABLE_NAME)
      const users = result.map(user=>{return(Band.toBandModel(user))})
      return users;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}

export default new BandDatabase();
