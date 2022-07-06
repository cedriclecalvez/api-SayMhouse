import userRouter from '../modules/User';
import roomRouter from '../modules/Room';
import messageRouter from '../modules/Message';

const routes = {
  '/users': userRouter,
  '/rooms': roomRouter,
  '/messages': messageRouter,
}

export default routes;