/* eslint-disable import/newline-after-import */
/* eslint-disable lines-between-class-members */
import {
  Table,
  Column,
  CreatedAt,
  Model,
  PrimaryKey,
  BeforeCreate
} from "sequelize-typescript";

import { hash } from "bcryptjs";
@Table({
  tableName: "ResetPassWord",
  timestamps: true,
  updatedAt: false // desativa o uso do campo "updatedAt"
})
class ResetPassWord extends Model<ResetPassWord> {
  @PrimaryKey
  @Column
  tokenHash: string;

  @Column
  email: string;

  @CreatedAt
  createdAt: Date;
  @BeforeCreate
  static hashPassword = async (instance: ResetPassWord): Promise<void> => {
    if (instance.createdAt) {
      instance.tokenHash = await hash(
        `${instance.createdAt.getTime()}:${instance.email}`,
        8
      );
    }
  };
}

export default ResetPassWord;
