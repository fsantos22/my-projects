import { Show } from "../../src/model/Show";

export const showMock1 = new Show("id", "bandId", Show.stringToDAY_SHOWS("SUNDAY"), 8, 10);

export const showMock2 = new Show(
  "id2",
  "bandId2",
  Show.stringToDAY_SHOWS("SUNDAY"),
  10,
  12
);
