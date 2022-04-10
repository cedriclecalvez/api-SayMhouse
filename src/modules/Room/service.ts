import RoomDTO from "./dto";
import { ApiError } from "../../helpers/error";

import { IRoomRepository } from "./repository";
import { RoomEntity } from "./entity";

export interface IRoomService {
  register(roomData: any): Promise<RoomDTO>;
}

export default class RoomService implements IRoomService {
  private roomRepository;

  constructor(roomRepository: IRoomRepository) {
    this.roomRepository = roomRepository;
  }

  async register(roomData: { name: string }) {
    const { name } = { ...roomData };

    if (!name) {
      throw new ApiError(400, "Missing required room name fields");
    }

    const isRoomExist: any = await this.roomRepository.findByName(name);
    if (isRoomExist) {
      throw new ApiError(409, "This room already exist !");
    } else {
      const newRoom: any = await this.roomRepository.addNew(roomData);

      return new RoomDTO(newRoom);
    }
  }
}
