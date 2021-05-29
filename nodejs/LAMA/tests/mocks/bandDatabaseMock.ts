import { Band } from "../../src/model/Band";

export class BandDatabaseMock {

  public async registerBand(band: Band): Promise<void> {}
}

export default new BandDatabaseMock();
