import { Controller, Get, Post } from "../server";
import { IUserService, UserService } from "../service";
import { User, Role } from "../store/entity";
import R from "../util/R";

@Controller("/api")
export default class APIController {
  private UserService: IUserService;
  constructor() {
    this.UserService = new UserService();
  }

  @Post("/user")
  async user(u: User) {
    return await this.UserService.add(u);
  }

  @Post("/login")
  async login({ username, passowrd }) {
    return await this.UserService.login(username, passowrd);
  }

  @Get("/logout")
  async logout() {
    return R.ok("logout suss");
  }
}
