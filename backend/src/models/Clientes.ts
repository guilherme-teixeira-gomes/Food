/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
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
  AutoIncrement,
  BelongsToMany,
  HasMany
} from "sequelize-typescript";
import { hash, compare } from "bcryptjs";


@Table({
  tableName: "Clientes",
  timestamps: true
})
class Clientes extends Model<Clientes> {
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
  crm: string;

  @Column(DataType.STRING(2))
  uf: string;

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
  static hashPassword = async (customer: Clientes): Promise<void> => {
    if (customer.password) {
      customer.passwordHash = await hash(customer.password, 8);
    }
  };

  public checkPassword = async (password: string): Promise<boolean> => {
    const teste = await hash(password, 8);
    return compare(password, this.getDataValue("passwordHash"));
  };
}

export default Clientes;
