import { ShowBusiness } from "../src/business/ShowBusiness";
import { ShowDatabase } from "../src/data/ShowDatabase";
import authenticatorMock from "./mocks/authenticatorMock";
import showDatabaseMock from "./mocks/showDatabaseMock";
import idGeneratorMock from "./mocks/idGeneratorMock";
import { showMock1, showMock2 } from "./mocks/showMock";

const showBusiness = new ShowBusiness(
  idGeneratorMock,
  authenticatorMock,
  showDatabaseMock as ShowDatabase
);

describe("registerShow", () => {
  it("Should throw error when token isn't ADMIN", async () => {
    expect.assertions(2);
    try {
      await showBusiness.registerShow({
        bandId: "bandId",
        day: "SUNDAY",
        startTime: 8,
        endTime: 10,
        token: "NORMAL",
      });
    } catch (error) {
      expect(error.statusCode).toBe(401);
      expect(error.message).toBe("Unauthorized!");
    }
  });

  it("Should throw error when bandId is blank", async () => {
    expect.assertions(2);
    try {
      await showBusiness.registerShow({
        bandId: "",
        day: "SUNDAY",
        startTime: 8,
        endTime: 10,
        token: "ADMIN",
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe("Missing input");
    }
  });

  it("Should throw error when day is blank", async () => {
    expect.assertions(2);
    try {
      await showBusiness.registerShow({
        bandId: "bandId",
        day: "",
        startTime: 8,
        endTime: 10,
        token: "ADMIN",
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe("Missing input");
    }
  });

  it("Should throw error when day is not valid", async () => {
    expect.assertions(2);
    try {
      await showBusiness.registerShow({
        bandId: "bandId",
        day: "MONDAY",
        startTime: 8,
        endTime: 10,
        token: "ADMIN",
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe(
        "Invalid day. Choose between 'FRIDAY', 'SATURDAY' or 'SUNDAY'"
      );
    }
  });

  it("Should throw error when startTime is blank", async () => {
    expect.assertions(2);
    try {
      await showBusiness.registerShow({
        bandId: "bandId",
        day: "SUNDAY",
        startTime: Number(),
        endTime: 10,
        token: "ADMIN",
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe("Missing input");
    }
  });

  it("Should throw error when endTime is blank", async () => {
    expect.assertions(2);
    try {
      await showBusiness.registerShow({
        bandId: "bandId",
        day: "SUNDAY",
        startTime: 8,
        endTime: Number(),
        token: "ADMIN",
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe("Missing input");
    }
  });

  //   it("Should throw error when bandId is already registered", async () => {
  //     expect.assertions(2);
  //     try {
  //       await showBusiness.registerShow({
  //         bandId: "bandId2",
  //         day: "SUNDAY",
  //         startTime: 8,
  //         endTime: 10,
  //         token: "ADMIN",
  //       });
  //     } catch (error) {
  //       expect(error.statusCode).toBe(409);
  //       expect(error.message).toBe("Band already registered to this show!");
  //     }
  //   });

  it("Should throw error when endTime is less than 9", async () => {
    expect.assertions(2);
    try {
      await showBusiness.registerShow({
        bandId: "bandId",
        day: "SUNDAY",
        startTime: 10,
        endTime: 8,
        token: "ADMIN",
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe("Show must end from 9 to 23!");
    }
  });

  it("Should throw error when startTime is greater than endTime", async () => {
    expect.assertions(2);
    try {
      await showBusiness.registerShow({
        bandId: "bandId",
        day: "SUNDAY",
        startTime: 10,
        endTime: 9,
        token: "ADMIN",
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe(
        "Invalid schedule. startTime must be lower than endTime"
      );
    }
  });

  it("Should throw error when we have conflict schedule", async () => {
    expect.assertions(2);
    try {
      await showBusiness.registerShow({
        bandId: "bandId",
        day: "SUNDAY",
        startTime: 10,
        endTime: 10,
        token: "ADMIN",
      });
    } catch (error) {
      expect(error.statusCode).toBe(409);
      expect(error.message).toBe(
        "Schedule conflict. You already have a show between this time!"
      );
    }
  });

  it("Success", async () => {
    expect.assertions(0);
    try {
      await showBusiness.registerShow({
        bandId: "bandId",
        day: "SUNDAY",
        startTime: 8,
        endTime: 10,
        token: "ADMIN",
      });
    } catch (error) {}
  });
});

describe("getShowsByDay", () => {
  it("Should throw error when day is not valid", async () => {
    expect.assertions(2);
    try {
      await showBusiness.getShowsByDay("monday");
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe(
        "Invalid day. Choose between 'FRIDAY', 'SATURDAY' or 'SUNDAY'"
      );
    }
  });

  it("Success", async () => {
    expect.assertions(1);
    try {
      const result = await showBusiness.getShowsByDay("sunday");
      expect(result).toBe([showMock1, showMock2])
    } catch (error) {
    }
  });
});
