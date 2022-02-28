import {Request,Response,NextFunction} from "express"
import { ApiError } from "../../helpers/error";
import { IUserService } from './service';

export default class UserController{
    private userService;
    constructor(userService: IUserService){
        this.userService = userService;

    }

    hello = async (req : Request, res : Response, next : NextFunction) => {
        try {
            
            console.log("hello backend");
            res.status(200).json({message:"hello backend"})
        } catch (err:any) {
            // throw new ApiError (404,"la route ne fonctionne pas");
            next(err)
            
        }
        
    }

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // console.log('toto');

            const user = await this.userService.register({...req.body});
            res.status(201).json(user);
        }
        catch (err) {
            next(err);
        }
    }
}