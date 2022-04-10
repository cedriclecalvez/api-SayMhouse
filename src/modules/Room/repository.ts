import { EntityRepository, EntityManager } from "typeorm";
import { RoomEntity } from "./entity";

export interface IRoomRepository {
  // addNew(userEntity: any) : Promise<any>
  addNew({ name }: any): Promise<any>;
  findByName(name: string): Promise<any | undefined>;
}

@EntityRepository()
class RoomRepository implements IRoomRepository {
  constructor(private manager: EntityManager) {}

  async addNew({ name }: any) {
    return await this.manager.save(RoomEntity, {
      name,
    });
  }

  async findByName(name: string) {
    return await this.manager.findOne(RoomEntity, { where: { name: name } });
  }
}

export default RoomRepository;
