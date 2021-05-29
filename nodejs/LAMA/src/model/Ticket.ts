export class Ticket {
  constructor(
    private ticketId: string,
    private ticketName: string,
    private showId: string,
    private price: number,
    private totalTickets: number,
    private avaliableTickets: number,
    private soldTickets: number
  ) {}

  getTicketId() {
    return this.ticketId;
  }

  getTicketName() {
    return this.ticketName;
  }

  getShowId() {
    return this.showId;
  }

  getPrice() {
    return this.price;
  }

  getTotalTickets() {
    return this.totalTickets;
  }

  getAvaliableTickets() {
    return this.avaliableTickets;
  }

  getSoldTickets() {
    return this.soldTickets;
  }

  setTicketId(ticketId: string) {
    this.ticketId = ticketId;
  }
  setTicketName(ticketName: string) {
    this.ticketName = ticketName;
  }
  setShowId(showId: string) {
    this.showId = showId;
  }
  setPrice(price: number) {
    this.price = price;
  }
  setTotalTickets(totalTickets: number) {
    this.totalTickets = totalTickets;
  }
  setAvaliableTickets(avaliableTickets: number) {
    this.avaliableTickets = avaliableTickets;
  }
  setSoldTickets(soldTickets: number) {
    this.soldTickets = soldTickets;
  }

  static toTicketModel(ticket?: any): Ticket | undefined {
    return (
      ticket &&
      new Ticket(
        ticket.ticketId,
        ticket.ticket_name,
        ticket.show_id,
        ticket.price,
        ticket.total_tickets,
        ticket.avaliable_tickets,
        ticket.sold_tickets
      )
    );
  }
}

export interface createTicketDTO {
  ticketName: string;
  showId: string;
  price: number;
  totalTickets: number;
  avaliableTickets: number;
  soldTickets: number;
  token: string;
}

export interface createTicketInputDTO {
  ticketName: string;
  showId: string;
  price: number;
  totalTickets: number;
  token: string;
}

export interface TicketModelDTO {
  userTicketId: string;
  ticketId: string;
  userId:string;
  quantity: number;
}

export interface buyTicketInputDTO {
  ticketId: string;
  quantity: number;
  token: string;
}

export interface updateTicketsInputDTO {
  ticketId: string;
  newTotal: number;
  soldTickets: number;
}
