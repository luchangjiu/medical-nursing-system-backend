import { BaseService, IBaseService } from "../BaseService";
import { User } from "/@/store/entity";
import { SQLiteConnect } from "/@/store/sqlite";
import { TokenGenerate } from "/@/util";
import R from "/@/util/R";
export interface IUserService extends IBaseService<User> {
  login(username: string, password: string): Promise<R>;
}

export class UserService extends BaseService<User> implements IUserService {
  constructor() {
    super(User);
  }

  @SQLiteConnect()
  async login(username: string, password: string): Promise<R> {
    const u = await this.repository.findOne({
      where: {
        username,
        password,
      },
    });
    if (u) {
      return R.ok("登录成功", {
        token: TokenGenerate(u.username, u.userId),
      });
    } else {
      return R.fail("登录失败！");
    }
  }
}
