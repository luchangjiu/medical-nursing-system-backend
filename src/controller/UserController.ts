import { Controller, Post } from "../server";
import { IUserService, UserService } from "../service";
import { User } from "../store/entity";

@Controller("/api/user")
export class UserController {
  private UserService: IUserService;
  constructor() {
    this.UserService = new UserService();
  }

  @Post("/add")
  async add(u: User) {
    return await this.UserService.add(u);
  }
}
