import { Show } from "../../src/model/Show";
import { showMock1, showMock2 } from "./showMock";

export class ShowDatabase {
  public async registerShow(show: Show): Promise<void> {
    try {
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getShowByBandId(bandId: string): Promise<Show | undefined> {
    try {
      if (bandId === "bandId2") {
        return showMock2;
      }
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async checkScheduleConflict(
    startTime: number,
    endTime: number
  ): Promise<boolean> {
    try {
      if (startTime === endTime) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getShowsByDay(day: string): Promise<(Show | undefined)[]> {
    try {
      if (day === "SUNDAY") {
        return [showMock1, showMock2];
      } else {
        return [];
      }
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}

export default new ShowDatabase();
