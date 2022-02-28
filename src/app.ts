import express from 'express';
import Server from './config/server';
// import {db} from './config/database';
import middlewares, {logger} from './middlewares';
import routes from "./config/routes"
import {handleError} from "./helpers/error"
import config from './config/constant';

const app = express();


const server = new Server(app);
// server.connecte(db,logger);
server.initializeMiddlewares(middlewares);
server.routes(routes)
server.errorHandler(handleError)
server.start(config.app_port);