import { Express, Application, Request, Response } from "express";
import Logger from "../helpers/logger";
import config from "./constant";


class Server {
  app: Application;
  constructor(app: Application) {
    this.app = app;
  }

  async connecte(db: any,logger: Logger) {
    try {
      // await db.associateAll(db.sequelize.models)
      await db.connect();
      console.log("[App]: Connected to Bdd");
    } catch (err:any) {
      console.error(err);
      logger.log(500, err.message)
  
    }
  }

  initializeMiddlewares(middlewares: any) {
    for (const key in middlewares) {
      if (key === "csrf") {
        this.app.get(
          "/csrf",
          middlewares[key],
          (req: Request | any, res: Response) => {
            
            res.status(200).json(req.csrfToken());
          }
        );
      } else this.app.use(middlewares[key]);
    }
  }

  routes(routes: any) {
    for (const path in routes) {
      this.app.use(`${config.api_version}${path}`, routes[path]);
    }
  }

  errorHandler(handleError: any) {
    this.app.use(handleError);
  }

  start(port: any) {
    this.app.listen(port, async () => {
      console.log(`[App]: Listening on PORT ${port}`);
    });
  }
}

export default Server;
