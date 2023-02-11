import { Controller, Get, Post } from "../server";
import { UserService } from "../service";
import { User, Role } from "../store/entity";
import { RoleRepository, UserRepository } from "../store/repository";
import { Connection, OpenConnection } from "../store/sqlite";

@Controller("/api")
export default class APIController {
  constructor() {}

  @Get("/hello")
  hello() {
    return "hello world";
  }

  @Post("/user")
  async saveUser(u: User) {
    let us = new UserService();
    return await us.save(u);
  }

  @Post("/role")
  async saveRole(r: Role) {
    await OpenConnection();
    return await RoleRepository.saveRole(r);
  }

  @Get("/rolelist")
  async getRoles() {
    await OpenConnection();
    var list = await RoleRepository.find();

    return list;
  }
}
