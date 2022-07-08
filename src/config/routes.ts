import userRouter from '../modules/User';
import ticketRouter from '../modules/Ticket';
import messageRouter from '../modules/Message';

const routes = {
  '/user': userRouter,
  '/ticket': ticketRouter,
  '/message': messageRouter,
}

export default routes;