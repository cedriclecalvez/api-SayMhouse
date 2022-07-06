
import { IMessageRepository } from "../interfaces/message.interface";

export default class UserService {
  private messageRepository;

  constructor(messageRepository: IMessageRepository) {
    this.messageRepository = messageRepository;
  }

  async getAllMessages() {
    // findAll method
    const messages: any = await this.messageRepository.findAllMessages();
    console.log("messages in getAll()====>", messages);
    return messages;
  }

  async register(message: string) {
    const newMessage: any = await this.messageRepository.addNew(message);
    return newMessage
  }
}
