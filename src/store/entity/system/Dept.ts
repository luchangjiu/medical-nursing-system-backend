import { IsDate } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("t_sys_dept")
export default class SysDept {
  @PrimaryGeneratedColumn("uuid")
  deptId: string;
  @Column()
  deptName: string;
  @Column()
  deptCode: string;
  @Column()
  state: number;
  @Column()
  parentDeptId: string;
  @Column()
  orderNo: number;
  @Column()
  remark: string;
  
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
