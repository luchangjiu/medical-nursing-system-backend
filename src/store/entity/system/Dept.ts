import { IsDate } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("t_sys_dept")
export class Dept {
  @PrimaryGeneratedColumn("uuid")
  deptId: string;
  @Column()
  deptName: string;
  @Column()
  deptCode: string;
  @Column({
    default: 0,
  })
  state: number;
  @Column({
    nullable: true,
  })
  parentDeptId: string;
  @Column({
    default: 0,
  })
  orderNo: number;
  @Column({
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

  children?: Array<Dept>;
}
