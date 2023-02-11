import { Column, Entity, PrimaryColumn } from "typeorm";
import { IsDate, IsEmail, Length } from "class-validator";
@Entity("t_sys_menu")
export default class Menu {
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
   * 状态 使用二进制存储
   * 状态 bit1: 1 启用 0 禁用
   * 显示 bit2: 1 显示 0 不显示
   * 外链 bit3: 1 是外链 0 否
   * 缓存 bit4: 1 缓存 0 不缓存
   */
  @Column({
    type: "real",
    default: 3,
  })
  state?: number;

    
    
    
  @Column()
  createUser: string;
  @IsDate()
  @Column({
    default: () => "datetime('now')",
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
