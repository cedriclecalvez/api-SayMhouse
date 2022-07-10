import { ApiError } from "../../helpers/error";
import { ITicketRepository } from "../interfaces/ticket.interface";
import { JwtService } from "../../libs/jwt";

export default class TicketService {
  private ticketRepository;
  private jwt;

  constructor(ticketRepository: ITicketRepository, jwtService: JwtService) {
    this.ticketRepository = ticketRepository;
    this.jwt = jwtService;
  }

  async register(ticketData: any, refresh_token: any) {
    const isProcessing: boolean = false;
    const { name } = ticketData;
    const decodedToken: any = await this.jwt.decodeToken(refresh_token);

    if (!name) {
      throw new ApiError(400, "Missing required ticket name fields");
    }
    if (!decodedToken) {
      throw new ApiError(400, "Problem with user ID");
    }

    const isTicketExist: any = await this.ticketRepository.findByName(name);
    if (isTicketExist) {
      throw new ApiError(409, "This ticket already exist !");
    } else {
      const newTicket: any = await this.ticketRepository.addNew({
        name,
        isProcessing,
        users: [{ id: decodedToken }],
      });
      console.log("newTicket==>", newTicket);

      return newTicket;
    }
  }

  async getList() {
    const ticketList = await this.ticketRepository.listTickets();
    console.log("ask a list of tickets");
    return ticketList;
  }

  async getPersonalList(refresh_token: any) {
    const decodedToken: any = await this.jwt.decodeToken(refresh_token);
    const resultFindTicketsByRelations: any =
      await this.ticketRepository.findByRelations(decodedToken);
    return resultFindTicketsByRelations[0].tickets;
  }

  async getTicket(ticketData: string) {
    console.log("ticketData in service fron controller ===> ", ticketData);
    const ticket = await this.ticketRepository.getTicketRepo(ticketData);
    return ticket;
  }
}
