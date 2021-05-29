import { BaseDatabase } from "./BaseDatabase";
import { Show } from "../model/Show";

export class ShowDatabase extends BaseDatabase {
  private static TABLE_NAME = "lama_shows";

  public async registerShow(show: Show): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          show_id: show.getId(),
          band_id: show.getBandId(),
          day: show.getDay(),
          start_time: show.getStartTime(),
          end_time: show.getEndTime(),
        })
        .into(ShowDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getShowById(showId: string): Promise<Show | undefined> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(ShowDatabase.TABLE_NAME)
        .where({ show_id: showId });
      return Show.toShowModel(result[0]);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getShowByBandId(bandId: string): Promise<Show | undefined> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(ShowDatabase.TABLE_NAME)
        .where({ band_id: bandId });
      return Show.toShowModel(result[0]);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async checkScheduleConflict(
    startTime: number,
    endTime: number
  ): Promise<boolean> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(ShowDatabase.TABLE_NAME)
        .whereBetween("start_time", [startTime + 1, endTime])
        .orWhereBetween("end_time", [startTime + 1, endTime]);
      console.log("res", result);
      if (result[0]) {
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
      const result = await this.getConnection()
        .select("*")
        .from(ShowDatabase.TABLE_NAME)
        .where({ day: Show.stringToDAY_SHOWS(day) })
        .orderBy("start_time");
      return (
        result &&
        result.map((show) => {
          return Show.toShowModel(show);
        })
      );
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}

export default new ShowDatabase();
