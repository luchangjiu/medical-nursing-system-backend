import { BaseService, IBaseService } from "../BaseService";
import { Dept } from "/@/store/entity";
import { SQLiteConnect } from "/@/store/sqlite";
import R from "/@/util/R";

export interface IDeptService extends IBaseService<Dept> {
  list(params): Promise<R>;
}

export class DeptService extends BaseService<Dept> implements IDeptService {
  constructor() {
    super(Dept);
  }

  @SQLiteConnect()
  async list(params): Promise<R> {
    let mc = await this.repository
      .createQueryBuilder()
      .skip(0)
      .take(10)
      .getManyAndCount();
    let list = mc[0];
    let total = mc[1];
    return R.ok({
      list,
      total,
    });
  }

  private async deptList() {
    let parentList = await this.repository
      .createQueryBuilder()
      .where({ parentDeptId: "0" })
      .getMany();
    for (let d of parentList) {
      await this.getDeptChildren(d, d.deptId);
    }
    return parentList;
  }

  private async getDeptChildren(vo: Dept, parentDeptId) {
    let children = await this.repository
      .createQueryBuilder()
      .where({
        parentDeptId,
      })
      .getMany();
    vo.children = children;
  }
}
