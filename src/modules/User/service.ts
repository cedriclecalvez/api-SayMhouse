import UserDTO from './dto';
import { ApiError } from '../../helpers/error';

import { IUserRepository } from './repository';
import { User } from './entity';

export interface IUserService {
   
    register(userData: any) : Promise<UserDTO>
    
}

export default class UserService implements IUserService {

    private userRepo;
   
    constructor(userRepository: IUserRepository) {
        this.userRepo = userRepository;
        
    }

    

    async register(userData: User) {
        
        if (!userData.email || !userData.password)
            throw new ApiError(400, 'Missing required email and password fields');
        
        const newUser = await this.userRepo.addNew(userData);
        
        return new UserDTO(newUser);
    }

   
}