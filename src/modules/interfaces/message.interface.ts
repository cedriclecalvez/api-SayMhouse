import { NextFunction, Request, Response } from "express";
import IMessageService from "../Message/service";

export interface IMessageRepository {
  findAllMessages(): Promise<any[]>;

  addNew({ email, password }: any): Promise<any>;
}

export interface IMessageController {
  userService: IMessageService;
  hello(req: Request, res: Response, next: NextFunction): Promise<void>;

  findAllMesssages(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;

  register(req: Request, res: Response, next: NextFunction): Promise<void>;
}
