import { EntityRepository, EntityManager } from "typeorm";
import { MessageEntity } from "./entity";
import { IMessageRepository } from "../interfaces/message.interface";

@EntityRepository()
class MessageRepository implements IMessageRepository {
  constructor(private manager: EntityManager) {}

  async findAllMessages() {
    return await this.manager.find(MessageEntity);
  }
  async addNew(contain: string) {
    return await this.manager.save(MessageEntity, {
      contain
    });
  }
}
export default MessageRepository;
