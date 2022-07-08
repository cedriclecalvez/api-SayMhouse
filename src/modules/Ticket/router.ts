import { Router } from "express";
// import { auth } from "../../middlewares";
import TicketController from "./controller";

export default (controller: TicketController) => {
  const ticketRouter = Router();

  ticketRouter.route("/testRoutes").get(controller.hello);

  // userRouter.route("/").get(auth.isAuth, controller.getAll).post(controller.register);
  ticketRouter.route("/register").post(controller.register);
  ticketRouter.route("/list").get(controller.list);
  ticketRouter.route("/one/:id").get(controller.oneTicket);

  // userRouter.route(`/auth`).post(controller.login);

  return ticketRouter;
};
