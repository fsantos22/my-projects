import { BaseDatabase } from "../../src/data/BaseDatabase";
import {
  Ticket,
  TicketModelDTO,
  updateTicketsInputDTO,
} from "../../src/model/Ticket";
import { ticketMock } from "./ticketMock";

export class TicketDatabaseMock extends BaseDatabase {
  public async createTicket(ticket: Ticket): Promise<void> {
    try {
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async buyTicket(input: TicketModelDTO): Promise<void> {
    try {
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async updateTicketsInfo(input: updateTicketsInputDTO): Promise<void> {
    try {
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getTicketById(ticketId: string): Promise<Ticket | undefined> {
    try {
        if(ticketId === "id"){
            return ticketMock;
        }
        return undefined
      
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}

export default new TicketDatabaseMock();
