import { ApolloError } from "apollo-server-errors";
import bcrypt from "bcrypt";
import {
  CreateUserInput,
  LoginInput,
  User,
  UserModel,
} from "../schema/user.schema";
import Context from "../types/context";
import { signJwt } from "../utils/jwt";

class UserService {
  async createUser(input: CreateUserInput) {
    const existUser = await UserModel.findOne({
      username: input.username,
    }).lean();
    if (existUser) {
      throw new ApolloError("This username alread exist.");
    }

    return UserModel.create(input);
  }

  async login(input: LoginInput, context: Context) {
    const err = "Invalid username or password";

    const user = await UserModel.findOne({ username: input.username }).lean();

    if (!user) {
      throw new ApolloError(err);
    }

    const passwordIsValid = await bcrypt.compare(input.password, user.password);

    if (!passwordIsValid) {
      throw new ApolloError(err);
    }

    const token = signJwt(user);

    context.res.cookie("accessToken", token, {
      maxAge: 60 * 60 * 1000, // 1 hour
      httpOnly: true,
      domain: "localhost",
      path: "/",
      sameSite: "none",
      secure: true,
    });

    return token;
  }

  async readAllUsers() {
    return UserModel.find();
  }
}

export default UserService;
