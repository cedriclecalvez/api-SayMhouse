import UserDTO from './dto';
import { ApiError } from '../../helpers/error';

import { IUserRepository } from './repository';
import { UserEntity } from './entity';

export interface IUserService {
   
    register(userData: any) : Promise<UserDTO>
    
}

export default class UserService implements IUserService {

    private userRepository;
   
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
        
    }

    
    async register(userData: { email: string; password: string }) {
        const { email, password } = { ...userData };
    
        if (!email || !password) {
            throw new ApiError(400, 'Missing required email and password fields');
        }
    
        const isUserExist: any = await this.userRepository.findByEmail(email);
        // return isUserExist || 'email does not exist'
        if (isUserExist) {
          throw new ApiError(409, "This user already exist !");
        } else {
          const newUser: any = await this.userRepository.addNew(userData);
    
          return new UserDTO(newUser);
        }
      }
   
}