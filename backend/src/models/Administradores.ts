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
  AutoIncrement,
  HasMany,
  BelongsToMany
} from "sequelize-typescript";
import { hash, compare } from "bcryptjs";


@Table({
  tableName: "Administradores",
  timestamps: true
})
class Administradores extends Model<Administradores> {
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

  @Column(DataType.VIRTUAL)
  password: string;

  @Column(DataType.STRING)
  passwordHash: string;

  @Column(DataType.STRING)
  whatsapp: string;

  @Column(DataType.STRING)
  tokenHash: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BeforeUpdate
  @BeforeCreate
  static hashPassword = async (customer: Administradores): Promise<void> => {
    if (customer.password) {
      customer.passwordHash = await hash(customer.password, 8);
    }
  };

  public checkPassword = async (password: string): Promise<boolean> => {
    const teste = await hash(password, 8);
    return compare(password, this.getDataValue("passwordHash"));
  };
}

export default Administradores;
