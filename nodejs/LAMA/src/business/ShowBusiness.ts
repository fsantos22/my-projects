import { CustomError } from "../error/CustomError";
import { Show, registerShowInputDTO, DAY_SHOWS } from "../model/Show";
import authenticator, { Authenticator } from "../services/Authenticator";
import idGenerator, { IdGenerator } from "../services/IdGenerator";
import showDatabase, { ShowDatabase } from "../data/ShowDatabase";

export class ShowBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private authenticator: Authenticator,
    private showDatabase: ShowDatabase
  ) {}

  async registerShow(input: registerShowInputDTO): Promise<void> {
    const { bandId, day, startTime, endTime, token } = input;

    const tokenData = this.authenticator.getData(token);

    if (!tokenData || tokenData.role !== "ADMIN") {
      throw new CustomError(401, "Unauthorized!");
    }

    if (!bandId || !day || !startTime || !endTime) {
      throw new CustomError(422, "Missing input");
    }

    const band = await showDatabase.getShowByBandId(bandId);
    if (band) {
      throw new CustomError(409, "Band already registered to this show!");
    }

    if (
      isNaN(startTime) ||
      startTime % 1 > 0 ||
      isNaN(endTime) ||
      endTime % 1 > 0
    ) {
      throw new CustomError(
        422,
        "'startTime' and 'endTime' must be integers numbers between 8 and 23"
      );
    }

    if (startTime < 8 || startTime > 22) {
      throw new CustomError(422, "Show must start from 8 to 22!");
    }

    if (endTime < 9 || endTime > 23) {
      throw new CustomError(422, "Show must end from 9 to 23!");
    }

    if (startTime > endTime) {
      throw new CustomError(
        422,
        "Invalid schedule. startTime must be lower than endTime"
      );
    }

    if (await this.showDatabase.checkScheduleConflict(startTime, endTime)) {
      throw new CustomError(
        409,
        "Schedule conflict. You already have a show between this time!"
      );
    }

    const id = this.idGenerator.generate();

    await this.showDatabase.registerShow(
      new Show(id, bandId, Show.stringToDAY_SHOWS(day), startTime, endTime)
    );
  }

  async getShowsByDay(day: string): Promise<any> {

    if (!(day.toUpperCase() in DAY_SHOWS)) {
      throw new CustomError(
        422,
        "Invalid day. Choose between 'FRIDAY', 'SATURDAY' or 'SUNDAY'"
      );
    }

    return await this.showDatabase.getShowsByDay(day);
  }
}

export default new ShowBusiness(idGenerator, authenticator, showDatabase);
