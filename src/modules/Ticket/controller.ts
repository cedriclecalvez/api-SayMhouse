import { Request, Response, NextFunction } from "express";
import ITicketService from "./service";
import { TicketDTO } from "./dto";

export default class TicketController {
  private ticketService;
  constructor(ticketService: ITicketService) {
    this.ticketService = ticketService;
  }

  hello = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("hello backend module ticket");
      res.status(200).json({ message: "hello backend" });
    } catch (err: any) {
      // throw new ApiError (404,"la route ne fonctionne pas");
      next(err);
    }
  };

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log('toto');

      // const ticket = await this.ticketService.register({...req.body});
      const ticket = await this.ticketService.register(req.body.name);
      res.status(201).json(new TicketDTO(ticket));
    } catch (err) {
      next(err);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log('toto');

      const tickets = await this.ticketService.getList();
      console.log(" controller listtickets", tickets);

      res.status(201).json(tickets);
    } catch (err) {
      next(err);
    }
  };
  oneTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ticketId = req.params.id;
      const ticket = await this.ticketService.getTicket(ticketId);
      console.log("controller oneticket ===>", ticket);
      res.status(201).json(ticket);
    } catch (err) {
      next(err);
    }
  };
}
