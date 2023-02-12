import { ObjectLiteral } from "typeorm";
import Dept from "/@/store/entity/system/Dept";
import Menu from "/@/store/entity/system/Menu";
import { Role } from "/@/store/entity/system/Role";
import { User } from "/@/store/entity/system/User";

export * from "/@/store/entity/system/User";
export * from "/@/store/entity/system/Role";
export * from "/@/store/entity/system/Menu";
export * from "/@/store/entity/system/Dept";

export const BindEntities = [User, Role, Menu, Dept];

export interface IBaseEntity extends ObjectLiteral {}
