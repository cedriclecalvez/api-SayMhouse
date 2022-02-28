import {EntityRepository, EntityManager} from "typeorm";
import bcrypt from 'bcrypt';
import { UserEntity } from "./entity";

export interface IUserRepository {   
    // addNew(userEntity: any) : Promise<any>
    addNew({ email, password }: any): Promise<any>;
    findByEmail(email: string): Promise<any | undefined>;
    compareHash(password: string, hash: string): Promise<Boolean>;
    
}

@EntityRepository()
class UserRepository implements IUserRepository {

    constructor(private manager: EntityManager) {
    }


    async addNew({ email, password }: any) {
       
    
        const passHash = await bcrypt.hash(password, 10);
        console.log("password hashed: ", passHash);
    
        return await this.manager.save(UserEntity, {
            email,
            password: passHash,
            access_token: "",
        });
      }

    
    
      async findByEmail(email: string) {
        return await this.manager.findOne(UserEntity, { where: { email: email } });
      }
    
      compareHash = async (password: string | Buffer, hash: string) =>
        await bcrypt.compareSync(password, hash);
    
  
}

export default UserRepository;