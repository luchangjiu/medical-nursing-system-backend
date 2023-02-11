import { BaseService, IBaseService } from "../BaseService";
import { Role } from "/@/store/entity";

export interface IRoleService extends IBaseService<Role> {
  list(): Promise<Role[]>;
}

export class RoleService extends BaseService<Role> {
  constructor() {
    super(Role);
  }
  list(): Promise<Role[]> {
    throw new Error("Method not implemented.");
  }
}
