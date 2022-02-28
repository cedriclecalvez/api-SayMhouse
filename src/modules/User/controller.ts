import {Request,Response,NextFunction} from "express"

export default class UserController{
    constructor(){

    }

    hello = async (req : Request, res : Response, next : NextFunction) => {
        try {
            
            console.log("hello");
            res.status(200).json({message:"hello"})
        } catch (error:any) {
            throw new Error (error.message);
            
        }
        
    }
}