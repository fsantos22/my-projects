import { TicketBusiness } from "../src/business/TicketBusiness";
import { TicketDatabase } from "../src/data/TicketDatabase";
import authenticatorMock from "./mocks/authenticatorMock";
import ticketDatabaseMock from "./mocks/ticketDatabaseMock";
import idGeneratorMock from "./mocks/idGeneratorMock";
import { ticketMock } from "./mocks/ticketMock";

const ticketBusiness = new TicketBusiness(
  idGeneratorMock,
  authenticatorMock,
  ticketDatabaseMock as TicketDatabase
);

describe("createTicket", () => {
  let input = {
    ticketName: "SEÇÃO A",
    showId: "53dbe4e2-eaf9-4339-a88a-129f5a522447",
    price: 10,
    totalTickets: 100,
    token: "ADMIN",
  };
  it("Should throw error when 'ticketName' is blank", async () => {
    expect.assertions(2);
    try {
      input.ticketName = "";
      await ticketBusiness.createTicket(input);
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe("Missing input");
    }
  });
  it("Should throw error when 'showId' is blank", async () => {
    expect.assertions(2);
    try {
      input.showId = "";
      await ticketBusiness.createTicket(input);
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe("Missing input");
    }
  });
  it("Should throw error when 'price' is blank", async () => {
    expect.assertions(2);
    try {
      input.price = Number("");
      await ticketBusiness.createTicket(input);
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe("Missing input");
    }
  });
  it("Should throw error when 'totalTickets' is blank", async () => {
    expect.assertions(2);
    try {
      input.totalTickets = Number("");
      await ticketBusiness.createTicket(input);
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe("Missing input");
    }
  });
  it("Should throw error when 'role' isn't admin", async () => {
    expect.assertions(2);
    try {
      input.token = "NORMAL";
      await ticketBusiness.createTicket(input);
    } catch (error) {
      expect(error.statusCode).toBe(401);
      expect(error.message).toBe("Unauthorized!");
    }
  });
  it("Success", async () => {
    expect.assertions(0);
    try {
      await ticketBusiness.createTicket(input);
    } catch (error) {}
  });
});

describe("buyTicket", () => {});
