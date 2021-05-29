import { CustomError } from "../error/CustomError";
import {
  Band,
  registerBandInputDTO,
} from "../model/Band";
import authenticator, { Authenticator } from "../services/Authenticator";
import idGenerator, { IdGenerator } from "../services/IdGenerator";
import bandDatabase, { BandDatabase } from "../data/BandDatabase";

export class BandBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private authenticator: Authenticator,
    private bandDatabase: BandDatabase
  ) {}

  async registerBand(band: registerBandInputDTO): Promise<void> {
    try {
      const { name, genre, responsible, token } = band;

      const tokenData = this.authenticator.getData(token);

      if (!tokenData || tokenData.role !== "ADMIN") {
        throw new CustomError(401, "Unauthorized!");
      }

      if (!name || !genre || !responsible) {
        throw new CustomError(422, "Missing input");
      }

      const id = this.idGenerator.generate();

      await this.bandDatabase.registerBand(
        new Band(id, name, genre, responsible)
      );
    } catch (error) {
      if (error.message.includes("key 'name'")) {
        throw new CustomError(409, "Band name already in use");
      }

      throw new CustomError(error.statusCode, error.message);
    }
  }

  async searchBand(
    id?: string,
    name?: string
  ): Promise<Band | undefined | (Band | undefined)[]> {
    try {
      if (!name) {
        const result = await this.bandDatabase.getBandById(id as string);
        if (!result) {
          throw new CustomError(404, "Band not found!");
        }
        return result;
      }
      if (!id) {
        const result = await this.bandDatabase.getBandByName(name);
        if (!result) {
          throw new CustomError(404, "Band not found!");
        }
        return result;
      }
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
}

export default new BandBusiness(idGenerator, authenticator, bandDatabase);
