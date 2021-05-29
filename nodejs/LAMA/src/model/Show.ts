import { CustomError } from "../error/CustomError";

export class Show {
  constructor(
    private id: string,
    private bandId: string,
    private day: DAY_SHOWS,
    private startTime: number,
    private endTime: number
  ) {}

  getId() {
    return this.id;
  }

  getBandId() {
    return this.bandId;
  }

  getDay() {
    return this.day;
  }

  getStartTime() {
    return this.startTime;
  }

  getEndTime() {
    return this.endTime;
  }

  setId(id: string) {
    this.id = id;
  }
  setBandId(bandid: string) {
    this.bandId = bandid;
  }
  setDay(day: DAY_SHOWS) {
    this.day = day;
  }
  setStartTime(startTime: number) {
    this.startTime = startTime;
  }
  setEndTime(endTime: number) {
    this.endTime = endTime;
  }

  static stringToDAY_SHOWS(input: string): DAY_SHOWS {
    switch (input.toUpperCase()) {
      case "FRIDAY":
        return DAY_SHOWS.FRIDAY;
      case "SATURDAY":
        return DAY_SHOWS.SATURDAY;
      case "SUNDAY":
        return DAY_SHOWS.SUNDAY;
      default:
        throw new CustomError(
          422,
          "Invalid day. Choose between 'FRIDAY', 'SATURDAY' or 'SUNDAY'"
        );
    }
  }

  static toShowModel(show?: any): Show | undefined {
    return (
      show &&
      new Show(
        show.show_id,
        show.band_id,
        Show.stringToDAY_SHOWS(show.day),
        show.start_time,
        show.end_time
      )
    );
  }
}

export enum DAY_SHOWS {
  FRIDAY = "FRIDAY",
  SATURDAY = "DATURDAY",
  SUNDAY = "SUNDAY",
}

export interface registerShowInputDTO {
  bandId: string;
  day: string;
  startTime: number;
  endTime: number;
  token: string;
}
