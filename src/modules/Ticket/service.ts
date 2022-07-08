import { ApiError } from "../../helpers/error";
import { ITicketRepository } from "../interfaces/ticket.interface";

export default class TicketService {
  private ticketRepository;

  constructor(ticketRepository: ITicketRepository) {
    this.ticketRepository = ticketRepository;
  }

  async register(name: string) {
    const isProcessing: boolean = false;
    const ticketData: any = { name, isProcessing };
    // const { name, isProcessing } = { ...ticketData };
    console.log("ticketData===>", ticketData);

    if (!name) {
      throw new ApiError(400, "Missing required ticket name fields");
    }

    const isTicketExist: any = await this.ticketRepository.findByName(name);
    if (isTicketExist) {
      throw new ApiError(409, "This ticket already exist !");
    } else {
      const newTicket: any = await this.ticketRepository.addNew(ticketData);

      return newTicket;
    }
  }

  async getList() {
    const ticketList = await this.ticketRepository.listTickets();
    console.log("ask a list of tickets");

    return ticketList;
  }

  async getTicket(ticketData: string) {
    console.log("ticketData in service fron controller ===> ", ticketData);
    const ticket = await this.ticketRepository.getTicketRepo(ticketData);
    return ticket;
  }
}
