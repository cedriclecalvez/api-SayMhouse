import {getCustomRepository} from 'typeorm';
import MessageRepository from "./repository"
import MessageService from "./service"
import MessageController from './controller';
import MessageRouter from './router';

const messageRepository = getCustomRepository(MessageRepository);
const messageService = new MessageService(messageRepository);
const messageController  = new MessageController(messageService);

const messageRouter  = MessageRouter(messageController);

export default messageRouter ;