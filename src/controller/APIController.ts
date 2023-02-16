import { Action, Controller, Get, Post } from "../server"
import { HttpMethod } from "../server/types"
import { IUserService, UserService } from "../service"
import { User, Role } from "../store/entity"
import R from "../util/R"

@Controller("/api")
export default class APIController {
  private UserService: IUserService
  count: number = 0
  constructor() {
    this.UserService = new UserService()
  }

  @Action({
    router: "/test",
    headers: true,
    auth: true,
  })
  test({ $data }) {
    console.log($data)
    return R.ok({ count: this.count++ })
  }

  @Post("/user")
  user(u: User) {
    return this.UserService.add(u)
  }

  @Post("/login")
  login({ username, passowrd }) {
    return this.UserService.login(username, passowrd)
  }

  @Get("/logout")
  logout() {
    return R.ok("logout suss")
  }
}
