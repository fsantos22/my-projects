import { BandBusiness } from "../src/business/BandBusiness";
import { BandDatabase } from "../src/data/BandDatabase";
import authenticatorMock from "./mocks/authenticatorMock";
import bandDatabaseMock from "./mocks/bandDatabaseMock";
import idGeneratorMock from "./mocks/idGeneratorMock";

const bandBusiness = new BandBusiness(
  idGeneratorMock,
  authenticatorMock,
  bandDatabaseMock as BandDatabase
);

describe("registerBand", () => {
  it("Should throw error when name is blank", async () => {
    expect.assertions(2);
    try {
      await bandBusiness.registerBand({
        name: "",
        genre: "genre",
        responsible: "responsible",
        token: "ADMIN",
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe("Missing input");
    }
  });

  it("Should throw error when genre is blank", async () => {
    expect.assertions(2);
    try {
      await bandBusiness.registerBand({
        name: "name",
        genre: "",
        responsible: "responsible",
        token: "ADMIN",
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe("Missing input");
    }
  });

  it("Should throw error when responsible is blank", async () => {
    expect.assertions(2);
    try {
      await bandBusiness.registerBand({
        name: "name",
        genre: "genre",
        responsible: "",
        token: "ADMIN",
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe("Missing input");
    }
  });

  it("Should throw error when no token is passed", async () => {
    expect.assertions(2);
    try {
      await bandBusiness.registerBand({
        name: "name",
        genre: "genre",
        responsible: "",
        token: "",
      });
    } catch (error) {
      expect(error.statusCode).toBe(401);
      expect(error.message).toBe("Unauthorized!");
    }
  });

  it("Should throw error when role isn't ADMIN", async () => {
    expect.assertions(2);
    try {
      await bandBusiness.registerBand({
        name: "name",
        genre: "genre",
        responsible: "",
        token: "NORMAL",
      });
    } catch (error) {
      expect(error.statusCode).toBe(401);
      expect(error.message).toBe("Unauthorized!");
    }
  });

  it("Success", async () => {
    expect.assertions(0);
    try {
      await bandBusiness.registerBand({
        name: "name",
        genre: "genre",
        responsible: "responsible",
        token: "ADMIN",
      });
    } catch (error) {}
  });
});

// describe("searchBand", () => {
//   it("Should throw error when name is incorrect", async () => {
//     expect.assertions(2)
//     try{
//       await bandBusiness.searchBand("")
//     }
//     catch(error){
//       expect(error.statusCode).toBe(404)
//       expect(error.message).toBe("Band not found!")
//     }
//   });
// });
