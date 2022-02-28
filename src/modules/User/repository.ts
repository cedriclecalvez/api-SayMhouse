import {EntityRepository, EntityManager} from "typeorm";
import bcrypt from 'bcrypt';
import { User } from "./entity";

export interface IUserRepository {   
    addNew(userEntity: any) : Promise<any>
    
}

@EntityRepository()
class UserRepository implements IUserRepository {

    constructor(private manager: EntityManager) {
    }


    async addNew(userEntity: any) {
        const salt = bcrypt.genSaltSync(10);
        userEntity.password = bcrypt.hashSync(userEntity.password, salt);
        return await this.manager.save(User, userEntity);
    }

  
}

export default UserRepository;