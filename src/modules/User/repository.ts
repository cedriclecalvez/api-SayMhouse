import { EntityRepository, EntityManager } from "typeorm";
import bcrypt from "bcrypt";
import { UserEntity } from "./entity";
import { IUserRepository } from "../interfaces/user.interface";



@EntityRepository()
class UserRepository implements IUserRepository {
  constructor(private manager: EntityManager) {}


  async findAllUser() {
    return await this.manager.find(UserEntity);
  }
  async addNew({ email, password }: any) {
    const passHash = await bcrypt.hash(password, 10);
    console.log("password hashed: ", passHash);

    return await this.manager.save(UserEntity, {
      email,
      password: passHash,
      access_token: "",
      refresh_token: "",
    });
  }

  async findByEmail(email: string) {
    return await this.manager.findOne(UserEntity, { where: { email: email } });
  }

  async findByUserID(id: string) {
    return await this.manager.findOne(UserEntity, { where: { id: id } });
  }

  compareHash = async (password: string | Buffer, hash: string) =>
    await bcrypt.compareSync(password, hash);
}

export default UserRepository;
