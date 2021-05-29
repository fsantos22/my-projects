import { BaseDatabase } from "./BaseDatabase";
import { Ticket, TicketModelDTO, updateTicketsInputDTO } from "../model/Ticket";

export class TicketDatabase extends BaseDatabase {
  private static TABLE_NAME = "lama_tickets";
  private static SOLD_TABLE_NAME = "lama_sold_tickets";

  public async createTicket(ticket: Ticket): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          ticket_id: ticket.getTicketId(),
          ticket_name: ticket.getTicketName(),
          show_id: ticket.getShowId(),
          price: ticket.getPrice(),
          total_tickets: ticket.getTotalTickets(),
          avaliable_tickets: ticket.getAvaliableTickets(),
          sold_tickets: ticket.getSoldTickets(),
        })
        .into(TicketDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async buyTicket(input: TicketModelDTO): Promise<void> {
    try {
      const { userTicketId, ticketId, userId, quantity } = input;
      await this.getConnection()
        .insert({
          user_ticket_id: userTicketId,
          ticket_id: ticketId,
          user_id: userId,
          quantity: quantity,
        })
        .into(TicketDatabase.SOLD_TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async updateTicketsInfo(input: updateTicketsInputDTO): Promise<void> {
    try {
      const { ticketId, newTotal, soldTickets } = input;
      await this.getConnection()
        .from(TicketDatabase.TABLE_NAME)
        .where({ ticket_id: ticketId })
        .update({ avaliable_tickets: newTotal, sold_tickets: soldTickets });
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getTicketById(ticketId: string): Promise<Ticket | undefined> {
    try {
      const result = await this.getConnection()
        .select("*")
        .where({ ticket_id: ticketId })
        .from(TicketDatabase.TABLE_NAME);
      return Ticket.toTicketModel(result[0]);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}

export default new TicketDatabase();
