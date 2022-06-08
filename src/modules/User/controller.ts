import { Request, Response, NextFunction } from "express";
import { IUserController } from "../interfaces/user.interface";
import { UserDTO } from "./dto";
import IUserService from "./service";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

export default class UserController implements IUserController {
  userService: IUserService;
  constructor(userService: IUserService) {
    this.userService = userService;
  }

  hello = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("hello backend");
      res.status(200).json({ message: "hello backend" });
    } catch (err: any) {
      // throw new ApiError (404,"la route ne fonctionne pas");
      next(err);
    }
  };

  findAllUsers = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<void> => {
    try {
      let users = await this.userService.getAllUsers();
      res.status(200).json(users.map((user: any) => new UserDTO(user)));
    } catch (err) {
      next(err);
    }
  };
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.register({ ...req.body });
      res.status(201).json(new UserDTO(user));
    } catch (err) {
      next(err);
    }
  };

  // login service
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.login({ ...req.body });

      const expireAt = new Date(Date.now() + 30 * 86400 * 1000);

      res.header("Authorization", `Bearer ${user.access_token}`);

      res.cookie("refresh_token", user.refresh_token, {
        httpOnly: true,
        expires: expireAt,
      });
      res.status(200).json({ result: "response ok" });
      res.end();
    } catch (err) {
      next(err);
    }
  };
}
