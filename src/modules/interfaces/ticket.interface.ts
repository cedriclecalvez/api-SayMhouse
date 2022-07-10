import { NextFunction, Request, Response } from "express";
import ITicketService from "../Ticket/service";

export interface ITicketRepository {
  findByRelations(decodedToken: any): any;

  addNew({ name, isProcessing }: any): Promise<any>;

  findByName(name: string): Promise<any | undefined>;

  listTickets(): Promise<any>;

  getTicketRepo(id: string): Promise<{} | undefined>;
}

export interface ITicketController {
  userService: ITicketService;
  hello(req: Request, res: Response, next: NextFunction): Promise<void>;

  register(req: Request, res: Response, next: NextFunction): Promise<void>;

  list(req: Request, res: Response, next: NextFunction): Promise<void>;

  oneTicket(req: Request, res: Response, next: NextFunction): Promise<void>;
}
