import {getCustomRepository} from 'typeorm';
import RoomRepository from "./repository"
import RoomService from "./service"
import RoomController from './controller';
import RoomRouter from './router';

const roomRepository = getCustomRepository(RoomRepository);
const roomService = new RoomService(roomRepository);
const roomController  = new RoomController(roomService);

const roomRouter  = RoomRouter(roomController);

export default roomRouter ;