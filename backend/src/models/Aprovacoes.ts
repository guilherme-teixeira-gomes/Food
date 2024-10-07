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
  HasMany,
  BelongsTo
} from "sequelize-typescript";
import { hash, compare } from "bcryptjs";
import Comidas from "./Comidas";


@Table({
  tableName: "Aprovacoes",
  timestamps: true
})
class Aprovacoes extends Model<Aprovacoes> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column(DataType.INTEGER)
  produtoId: number;

  @Column(DataType.STRING)
  status: string;

  @Column(DataType.BOOLEAN)
  disponivelParaCliente: boolean;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsTo(() => Comidas, "produtoId")
  comidas: Comidas;
}



export default Aprovacoes;
