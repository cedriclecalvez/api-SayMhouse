import { Request, Response, NextFunction } from "express";
import { IUserController } from "../interfaces/user.interface";
import { UserDTO } from "./dto";
import IUserService from "./service";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { UserEntity } from "./entity";
import { jwtService } from "../../libs";

export default class UserController implements IUserController {
  userService: IUserService;
  private jwt;
  constructor(userService: IUserService) {
    this.userService = userService;
    this.jwt = jwtService;
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
      console.log("req.headers.authorisation ===>", req.headers.authorisation);
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

  refreshAccess = async (
    req: Request | any,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { refresh_token } = req.cookies;
      console.log("req.cookies", req.cookies);

      if (!refresh_token)
      return res.status(498).json("4:Access denied. Your session expired");
      
      const decoded: any = await this.jwt.decodeToken(refresh_token);
      
      const user: any = await UserEntity.findOne({ where: { id: decoded.id } });
      
      user.access_token = await this.jwt.generateAccessToken(user);
      console.log("refresh route user===>",user.access_token);

      await user.save();
      // console.log(user);
      
      console.log("refresh route worked");
      
      res.header("Authorization", `Bearer ${user.access_token}`);
      res.status(200).json();
      // res.status(200).json(`Bearer ${user.access_token}`);
    } catch (e) {
      console.log("error while token save");
      
      return res.status(498).json("authentication failed:\n" + e);
    }
  };

  logout = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
      const { refresh_token } = req.cookies;
      console.log("req.cookies", req.cookies);

      if (!refresh_token)
        return res.status(401).json("4:Access denied. Your session expired");

      res.cookie("refresh_token", "", {
        httpOnly: true,
      });

      const decoded: any = await this.jwt.decodeToken(refresh_token);
      const user: any = await UserEntity.findOne({ where: { id: decoded.id } });
      user.access_token = "";
      user.refresh_token = "";

      await user.save();
      res.removeHeader("Authorization");
      res.status(200).json();
    } catch (e) {
      next(e);
    }
  };
}
