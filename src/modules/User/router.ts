import { Router } from "express";
import { auth } from "../../middlewares";
import UserController from "./controller";

export default (controller: UserController) => {
  const userRouter = Router();

  userRouter.route("/testRoutes").get(controller.hello);
  userRouter.route("/refresh").get(controller.refreshAccess);
  userRouter.route("/logout").get(controller.logout);

  userRouter.route("/auth/login").post(controller.login);

  // userRouter.route("/").get(auth.isAuth, controller.getAll).post(controller.register);
  userRouter.route("/auth/allUsers").get(auth.isAuth, controller.findAllUsers);

  userRouter.route("/auth/register").post(controller.register);

  // userRouter.route("/register").post(controller);

  userRouter.route(`/auth/login`).post(controller.login);

  return userRouter;
};
