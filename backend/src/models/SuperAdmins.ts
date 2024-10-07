/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
import {
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  Model,
  DataType,
  BeforeCreate,
  BeforeUpdate,
  PrimaryKey,
  AutoIncrement
} from "sequelize-typescript";
import { hash, compare } from "bcryptjs";

@Table({
  tableName: "SuperAdmins",
  timestamps: true
})
class SuperAdmins extends Model<SuperAdmins> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column(DataType.STRING)
  admin: string;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  email: string;
  
  @Column(DataType.STRING)
  usuario: string;

  @Column(DataType.VIRTUAL)
  password: string;

  @Column(DataType.STRING)
  passwordHash: string;

  @Column(DataType.STRING)
  tokenHash: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BeforeUpdate
  @BeforeCreate
  static hashPassword = async (customer: SuperAdmins): Promise<void> => {
    if (customer.password) {
      customer.passwordHash = await hash(customer.password, 8);
    }
  };

  public checkPassword = async (password: string): Promise<boolean> => {
    const teste = await hash(password, 8);
    return compare(password, this.getDataValue("passwordHash"));
  };
}

export default SuperAdmins;
