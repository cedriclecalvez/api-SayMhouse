import { Router } from "express";
import MessageController from "./controller";

export default (controller: MessageController) => {
  const messageRouter = Router();

  messageRouter.route("/testRouteMessage").get(controller.hello);
  messageRouter.route("/register").post(controller.register);
  messageRouter.route("/allMessages").get(controller.findAllMessages);
  //   messageRouter.route("/one/:id").get(controller.oneRoom);
  // userRouter.route(`/auth`).post(controller.login);

  return messageRouter;
};
