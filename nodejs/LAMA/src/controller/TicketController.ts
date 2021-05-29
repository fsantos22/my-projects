import { Request, Response } from "express";
import ticketBusiness from '../business/TicketBusiness'
import { BaseDatabase } from "../data/BaseDatabase";

export class TicketController {
  async createTicket(req: Request, res: Response) {
    try {
      const token = req.headers.authorization!;
      const { ticketName, showId, price, totalTickets } = req.body;
      const input = { ticketName, showId, price, totalTickets, token };
      await ticketBusiness.createTicket(input);
      res.status(201).send({ message: "Success!" });
    } catch (error) {
      res.status(error.statusCode).send({ error: error.message });
    }
    await BaseDatabase.destroyConnection();
  }

  async buyTicket(req: Request, res: Response) {
    try {
      const token = req.headers.authorization!;
      const { ticketId, quantity } = req.body;
      const input = { ticketId, quantity, token };
      await ticketBusiness.buyTicket(input);
      res.status(201).send({ message: "Success!"});
    } catch (error) {
      res.status(error.statusCode).send({ error: error.message });
    }
    await BaseDatabase.destroyConnection();
  }
}
