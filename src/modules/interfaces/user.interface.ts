import { NextFunction, Request, Response } from "express";
import { userType } from "../types/entities.type";
import {UserEntity} from "../User/entity";
import IUserService from "../User/service";

export interface IUserRepository {
  findAllUser(): Promise<any[]>;

  addNew({ email, password }: any): Promise<any>;

  findByEmail(email: string): Promise<any | undefined>;

  findByUserID(id: string): Promise<{} | undefined>;

  compareHash(password: string, hash: string): any;
}

export interface IUserController {
  userService: IUserService;
  hello(req: Request, res: Response, next: NextFunction): Promise<void>;
  
  findAllUsers(req: Request, res: Response, next: NextFunction): Promise<void>;

  register(req: Request, res: Response, next: NextFunction): Promise<void>;

  login(req: Request, res: Response, next: NextFunction): Promise<void>;
}
