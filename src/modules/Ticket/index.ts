import {getCustomRepository} from 'typeorm';
import TicketRepository from "./repository"
import TicketService from "./service"
import TicketController from './controller';
import TicketRouter from './router';

const ticketRepository = getCustomRepository(TicketRepository);
const ticketService = new TicketService(ticketRepository);
const ticketController  = new TicketController(ticketService);

const ticketRouter  = TicketRouter(ticketController);

export default ticketRouter ;