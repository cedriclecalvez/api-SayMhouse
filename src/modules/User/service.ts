import jwt from "jsonwebtoken";
import { ApiError } from "../../helpers/error";

import config from "../../config/constant";
import { IUserRepository } from "../interfaces/user.interface";

export default class UserService {
  private userRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async getAllUsers() {
    // findAll method
    const users: any = await this.userRepository.findAllUser();
    console.log("users in getAll()====>", users);
    return users;
  }

  async register(userData: {
    firstname: string;
    lastname: string;
    address: string;
    email: string;
    password: string;
  }) {
    const { firstname, lastname, address, email, password } = {
      ...userData,
    };

    if (
      !firstname ||
      !lastname ||
      !email ||
      !address ||
      !password
    ) {
      throw new ApiError(403, "missing data to register");
    }
    const isUserExist: any = await this.userRepository.findByEmail(email);
    // return isUserExist || 'email does not exist'
    if (isUserExist) {
      throw new ApiError(409, "This user already exist !");
    } else {
      const newUser: any = await this.userRepository.addNew(userData);

      return newUser;
    }
  }
  // login service
  async login(userData: { email: string; password: string }) {
    const { email, password } = { ...userData };

    if (!email || !password) {
      throw new ApiError(403, "missing email or password or both");
    }

    const user: any = await this.userRepository.findByEmail(email);
    if (!user) throw new ApiError(400, "unable to find user");

    const passwordMatch = await this.userRepository.compareHash(
      userData.password,
      user.password
    );
    if (!passwordMatch) throw new ApiError(403, "User password do not match");

    user.access_token = jwt.sign(
      { id: user.id, email: user.email },
      config.jwt_secret,
      { expiresIn: "24h" }
    );
    user.refresh_token = jwt.sign({ id: user.id }, config.jwt_secret, {
      expiresIn: "60d",
    });

    await user.save();

    return user;
  }
}
