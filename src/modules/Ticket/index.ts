import {getCustomRepository} from 'typeorm';
import TicketRepository from "./repository"
import TicketService from "./service"
import TicketController from './controller';
import TicketRouter from './router';
import {jwtService} from '../../libs';


const ticketRepository = getCustomRepository(TicketRepository);
const ticketService = new TicketService(ticketRepository,jwtService);
const ticketController  = new TicketController(ticketService);

const ticketRouter  = TicketRouter(ticketController);

export default ticketRouter ;