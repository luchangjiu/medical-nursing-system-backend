import "reflect-metadata";
import { ObjectLiteral, Repository } from "typeorm";
import { IBaseEntity } from "../store/entity";
import { Connection, sqliteConnect } from "../store/sqlite";
import R from "../util/R";

export interface IBaseService<T extends IBaseEntity> {
  add(u: T): Promise<R>;
  upd(u: T): Promise<R>;
  del(id: string): Promise<R>;
  findById(id: string): Promise<R>;
}
export abstract class BaseService<T extends IBaseEntity> {
  protected repository: Repository<T>;
  constructor(target) {
    this.repository = Connection.getRepository(target);
  }

  public count: number = 0;
  @sqliteConnect()
  async add(u: T): Promise<R> {
    await this.repository.save(u);
    return R.ok();
  }
  @sqliteConnect()
  async upd(u: T): Promise<R> {
    await this.repository.update(u.getId(), u);
    return R.ok();
  }
  @sqliteConnect()
  async del(id: string): Promise<R> {
    await this.repository.delete(id);
    return R.ok();
  }
  @sqliteConnect()
  async findById(id: string): Promise<R> {
    const entity = await this.repository
      .createQueryBuilder()
      .whereInIds(id)
      .getOne();
    return R.ok(entity);
  }
}
