import { BaseService, IBaseService } from "../BaseService";
import { Menu } from "/@/store/entity";
import { SQLiteConnect } from "/@/store/sqlite";
import R from "/@/util/R";

export interface IMenuService extends IBaseService<Menu> {
  list(params): Promise<R>;
}

export class MenuService extends BaseService<Menu> implements IMenuService {
  constructor() {
    super(Menu);
  }

  @SQLiteConnect()
  async list(params: any): Promise<R> {
    const mac = await this.repository.createQueryBuilder().getManyAndCount();
    return R.ok({
      list: mac[0],
      total: mac[1],
    });
  }
}
