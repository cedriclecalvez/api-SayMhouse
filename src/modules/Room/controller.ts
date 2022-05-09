import { Request, Response, NextFunction } from "express";
import { ApiError } from "../../helpers/error";
import { IRoomService } from "./service";

export default class RoomController {
  private roomService;
  constructor(roomService: IRoomService) {
    this.roomService = roomService;
  }

  hello = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("hello backend module room");
      res.status(200).json({ message: "hello backend" });
    } catch (err: any) {
      // throw new ApiError (404,"la route ne fonctionne pas");
      next(err);
    }
  };

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log('toto');

      const room = await this.roomService.register({ ...req.body });
      res.status(201).json(room);
    } catch (err) {
      next(err);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log('toto');

      const rooms = await this.roomService.getList();
      console.log(" controller listRooms", rooms);

      res.status(201).json(rooms);
    } catch (err) {
      next(err);
    }
  };
  oneRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roomId = req.params.id;
      const room = await this.roomService.getRoom(roomId);
      console.log("controller oneRoom ===>", room);
      res.status(201).json(room);
    } catch (err) {
      next(err);
    }
  };
}
