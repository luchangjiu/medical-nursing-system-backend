import { sqliteConnect } from "/@/aop";
import { User } from "/@/store/entity";
import { UserRepository } from "/@/store/repository";
export interface IUserService {}

export class UserService implements IUserService {
  public count: number = 0;

  @sqliteConnect([User])
  async save(u) {
    var result = await UserRepository.save(u);
    return result;
  }
}
