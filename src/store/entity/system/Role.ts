import { Column, Entity, PrimaryColumn } from "typeorm";
import { IsDate, IsEmail, Length } from "class-validator";
@Entity("t_sys_role")
export class Role {
  @PrimaryColumn({
    type: "text",
    generated: "uuid",
  })
  roleId: string;
  @Column("text")
  roleName: string;
  @Column("text")
  roleValue: string;
  @Column("real")
  state: number;
  @Column("real")
  orderNo: number;

  @Column("text")
  createUser: string;
  @IsDate()
  @Column({
    default: () => "datetime('now')",
    type: "text",
  })
  createTime: Date;
  @Column({
    nullable: true,
    type: "text",
  })
  updateUser?: string;
  @IsDate()
  @Column({
    type: "text",
    nullable: true,
  })
  updateTime?: Date;
}


