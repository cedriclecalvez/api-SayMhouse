import { Request, Response, NextFunction } from "express";
import { JwtService } from "../libs/jwt";
import { UserEntity } from "../modules/User/entity";
import config from "../config/constant";

class AuthMiddleware {
  private jwt;
  constructor(jwtService: JwtService) {
    this.jwt = jwtService;
  }

  isAuth = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
      let access_token = req.headers.authorization.split(" ")[1];
      const refreshToken = req.cookies["refresh_token"];

      if (!access_token) {
        return res.status(401).json("Access denied. Unauthorized");
      }
      if (!refreshToken) {
        return res.status(401).json("Access denied. Your session expired");
      }

      // Verify Token
      const decoded = await this.jwt.decodeToken(access_token);

      // if the user has permissions
      req.currentUserId = decoded.id;
      next();
    } catch (e) {
      return res.status(401).json("Authentication failed : \n" + e);
    }
  };

  async refreshAccess(req: Request | any, res: Response, next: NextFunction) {
    try {
      const { refresh_token } = req.cookies;
      console.log("req.cookies", req.cookies);

      if (!refresh_token)
        return res.status(401).json("4:Access denied. Your session expired");

      const decoded: any = await this.jwt.decodeToken(refresh_token);

      const user: any = await UserEntity.findOne({ where: { id: decoded.id } });

      user.access_token = this.jwt.generateAccessToken(user);
      await user.save();
      // console.log(user);

      res.header("Authorization", `Bearer ${user.access_token}`);
      res.status(200).json();
      // res.status(200).json(`Bearer ${user.access_token}`);
    } catch (e) {
      next(e);
    }
  }

  async logout(req: Request | any, res: Response, next: NextFunction) {
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
  }
}

export default AuthMiddleware;
