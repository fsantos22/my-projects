import { CustomError } from "../error/CustomError";
import { buyTicketInputDTO, Ticket } from "../model/Ticket";
import authenticator, { Authenticator } from "../services/Authenticator";
import ticketDatabase, { TicketDatabase } from "../data/TicketDatabase";
import { createTicketInputDTO } from "./../model/Ticket";
import showDatabase from "../data/ShowDatabase";
import idGenerator, { IdGenerator } from "../services/IdGenerator";

export class TicketBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private authenticator: Authenticator,
    private ticketDatabase: TicketDatabase
  ) {}

  async createTicket(ticket: createTicketInputDTO): Promise<void> {
    try {
      const { ticketName, showId, price, totalTickets, token } = ticket;

      const tokenData = this.authenticator.getData(token);

      if (!tokenData || tokenData.role !== "ADMIN") {
        throw new CustomError(401, "Unauthorized!");
      }

      if (!ticketName || !showId || !price || !totalTickets) {
        throw new CustomError(422, "Missing input");
      }

      if (
        isNaN(price) ||
        isNaN(totalTickets) ||
        price <= 0 ||
        totalTickets < 1
      ) {
        throw new CustomError(
          422,
          "'price' and 'total tickets' must be positive numbers!"
        );
      }

      const show = await showDatabase.getShowById(showId);
      if (!show) {
        throw new CustomError(404, "'showId' not found!");
      }

      const id = this.idGenerator.generate();
      const priceWithDecimals = Number(price.toFixed(2));
      const avaliableTickets = totalTickets;
      const soldTickets = 0;

      await this.ticketDatabase.createTicket(
        new Ticket(
          id,
          ticketName,
          showId,
          priceWithDecimals,
          totalTickets,
          avaliableTickets,
          soldTickets
        )
      );
    } catch (error) {
      if (error.message.includes("key 'ticket_id'")) {
        throw new CustomError(409, "Ticket id already in use");
      }

      throw new CustomError(error.statusCode, error.message);
    }
  }

  async buyTicket(ticket: buyTicketInputDTO): Promise<any> {
    try {
      const { ticketId, quantity, token } = ticket;

      const tokenData = this.authenticator.getData(token);

      if (!tokenData) {
        throw new CustomError(401, "Unauthorized!");
      }

      const userId = tokenData.id;

      if (!ticketId || !quantity) {
        throw new CustomError(422, "Missing input");
      }

      if (isNaN(quantity) || quantity < 1) {
        throw new CustomError(422, "'quantity' must be a positive number!");
      }

      const ticketInfo = await ticketDatabase.getTicketById(ticketId);
      const totalTickets = Number(ticketInfo?.getAvaliableTickets());
      if (quantity > totalTickets) {
        throw new CustomError(
          422,
          "'quantity' is greater than avaliable tickets!"
        );
      }

      const userTicketId = this.idGenerator.generate();
      const input = { userTicketId, ticketId, userId, quantity };
      await ticketDatabase.buyTicket(input);

      const newTotal = totalTickets - quantity;
      const soldTickets = Number(ticketInfo?.getSoldTickets()) + quantity;
      await ticketDatabase.updateTicketsInfo({
        ticketId,
        newTotal,
        soldTickets,
      });
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
}

export default new TicketBusiness(idGenerator, authenticator, ticketDatabase);
