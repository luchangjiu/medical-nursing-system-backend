import { ObjectLiteral } from "typeorm";

export * from "/@/store/entity/system/User";
export * from "/@/store/entity/system/Role";
export * from "/@/store/entity/system/Menu";
export * from "/@/store/entity/system/Dept";

export interface IBaseEntity extends ObjectLiteral {
  getId();
  setId(id: string);
}
