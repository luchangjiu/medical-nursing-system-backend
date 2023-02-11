import { Column, Entity, PrimaryColumn } from "typeorm";
import { IsDate, IsEmail, Length } from "class-validator";

@Entity("t_sys_user")
export class User {
  @PrimaryColumn({
    type: "char",
    generated: "uuid",
  })
  userId: string;
  @Length(3, 20)
  @Column()
  username: string;
  @Length(1, 20)
  @Column()
  realName: string;
  @Column({
    nullable: true,
  })
  nickname: string;
  @Column({
    nullable: true,
  })
  avatars: string;
  @Column({
    nullable: true,
  })
  @IsEmail()
  email?: string;
  @Column()
  password: string;
  @Column({
    default: 0,
    type: "int",
  })
  state: number;

  @Column({
    nullable: true,
  })
  remark?: string;

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
}
