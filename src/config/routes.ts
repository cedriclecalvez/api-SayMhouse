import userRouter from '../modules/User';
import roomRouter from '../modules/Room';

const routes = {
  '/users': userRouter,
  '/rooms': roomRouter,
}

export default routes;