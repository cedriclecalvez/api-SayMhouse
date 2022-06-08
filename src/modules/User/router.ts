import { Router } from "express";
// import { auth } from "../../middlewares";
import UserController from "./controller";

export default (controller: UserController) => {
  const userRouter = Router();

  userRouter.route("/testRoutes").get(controller.hello)
   
  // userRouter.route("/").get(auth.isAuth, controller.getAll).post(controller.register);
  userRouter.route("/register").post(controller.register);

  userRouter.route(`/auth/login`).post(controller.login);

  return userRouter;
};
