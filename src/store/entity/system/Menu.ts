import { Column, Entity, PrimaryColumn } from "typeorm";
import { IsDate, IsEmail, Length } from "class-validator";
@Entity("t_sys_menu")
export class Menu {
  @PrimaryColumn({
    type: "varchar",
    length: 36,
    generated: "uuid",
  })
  menuId: string;
  @Column({
    nullable: true,
  })
  icon: string;

  /**
   *  目录 dir
   *  菜单 menu
   *  按钮 btn
   */
  @Column({
    type: "varchar",
    default: "dir",
  })
  type: string;

  @Column()
  menuName: string;

  @Column({
    nullable: true,
  })
  router: string;
  @Column({
    nullable: true,
  })
  component: string;

  @Column({
    nullable: true,
  })
  permission: string;
  @Column({
    default: 0,
  })
  orderNo: number;
  @Column({
    type: "varchar",
    length: 36,
    nullable: true,
  })
  parentMenuId: string;

  /**
   * 状态 : 1 启用 0 禁用
   */
  @Column({
    type: "real",
    default: 1,
  })
  state?: number;
  /**
   * 是否外链 0 非外链 1 是外链
   */
  @Column({
    type: "real",
    default: 0,
  })
  isExt?: number;

  /**
   * 是否缓存 0 不缓存 1 缓存
   */
  @Column({
    type: "real",
    default: 0,
  })
  keepalive: number;

  /**
   * 是否显示 1 显示  0 不显示
   */
  @Column({
    type: "real",
    default: 1,
  })
  show: number;
  @Column({
    type: "text",
    nullable: true,
  })
  remark: string;

  @Column()
  createUser: string;
  @IsDate()
  @Column({
    default: () => "datetime('now','localtime')",
    type: "text",
  })
  createTime: Date;
  @Column({
    nullable: true,
  })
  updateUser?: string;
  @IsDate()
  @Column({
    type: "text",
    nullable: true,
  })
  updateTime?: Date;

  children?: Menu[];
}
