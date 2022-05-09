import { Router } from "express";
// import { auth } from "../../middlewares";
import RoomController from "./controller";

export default (controller: RoomController) => {
  const roomRouter = Router();

  roomRouter.route("/testRoutes").get(controller.hello);

  // userRouter.route("/").get(auth.isAuth, controller.getAll).post(controller.register);
  roomRouter.route("/register").post(controller.register);
  roomRouter.route("/list").get(controller.list);
  roomRouter.route("/one/:id").get(controller.oneRoom);

  // userRouter.route(`/auth`).post(controller.login);

  return roomRouter;
};
