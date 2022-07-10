import { EntityRepository, EntityManager } from "typeorm";
import { TicketEntity } from "./entity";
import { ITicketRepository } from "../interfaces/ticket.interface";
import { UserEntity } from "../User/entity";

@EntityRepository()
class TicketRepository implements ITicketRepository {
  constructor(private manager: EntityManager) {}

  async addNew(dataTicket: any) {
    return await this.manager.save(TicketEntity, dataTicket);
  }

  async findByName(name: string) {
    return await this.manager.findOne(TicketEntity, { where: { name: name } });
  }

  async findByRelations(decodedToken: any) {
    return await this.manager.find(UserEntity, {
      relations: ["tickets"],
      where: { id: decodedToken.id },
    });
  }

  // dont work
  async listTickets() {
    return await this.manager.find(TicketEntity);
  }
  async getTicketRepo(id: string) {
    return await this.manager.find(TicketEntity, {
      where: {
        id: id,
      },
    });
  }
}

export default TicketRepository;
