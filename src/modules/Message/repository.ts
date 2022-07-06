import { EntityRepository, EntityManager } from "typeorm";
import { MessageEntity } from "./entity";
import { IMessageRepository } from "../interfaces/message.interface";

@EntityRepository()
class MessageRepository implements IMessageRepository {
  constructor(private manager: EntityManager) {}

  async findAllMessages() {
    return await this.manager.find(MessageEntity);
  }
  async addNew(message: string) {
    return await this.manager.save(MessageEntity, {
      message,
    });
  }
}
export default MessageRepository;
