import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CreateUserInput, LoginInput, User } from "../schema/user.schema";
import UserService from "../service/user.service";
import Context from "../types/context";
import { CreateProductInput, Product } from "../schema/product.schema";

@Resolver()
export default class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Mutation(() => User)
  createUser(@Arg("input") input: CreateUserInput) {
    return this.userService.createUser(input);
  }

  @Mutation(() => String) //Return JWT
  login(@Arg("input") input: LoginInput, @Ctx() context: Context) {
    return this.userService.login(input, context);
  }

  @Mutation(() => Boolean)
  logout(@Ctx() context: Context) {
    context.res.clearCookie("accessToken");
    return true;
  }

  @Query(() => [User])
  readAllUsers() {
    return this.userService.readAllUsers();
  }

  @Query(() => User)
  me(@Ctx() context: Context) {
    return context.user;
  }
}
