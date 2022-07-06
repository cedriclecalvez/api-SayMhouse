import { Request, Response, NextFunction } from "express";
import { ApiError } from "../../helpers/error";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { MessageDTO } from "./dto";

import IMessageService from "./service";

export default class MessageController {
    messageService: IMessageService;
    constructor(messageService: IMessageService) {
      this.messageService = messageService;
    }

  hello = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("hello backend module message");
      res.status(200).json({ message: "hello backend" });
    } catch (err: any) {
      // throw new ApiError (404,"la route ne fonctionne pas");
      next(err);
    }
  };

 
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const message = await this.messageService.register({ ...req.body });
      res.status(201).json(new MessageDTO(message));
    } catch (err) {
      next(err);
    }
  };
  findAllMessages = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<void> => {
    try {
      console.log("req.headers.authorisation ===>", req.headers.authorisation);
      let messages = await this.messageService.getAllMessages();
      res.status(200).json(messages.map((message: any) => new MessageDTO(message)));
    } catch (err) {
      next(err);
    }
  };


}
