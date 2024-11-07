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
import Clientes from "./Clientes";


@Table({
  tableName: "Compras",
  timestamps: true
})
class Compras extends Model<Compras> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column(DataType.INTEGER)
  comidaId: number;
  
  @Column(DataType.INTEGER)
  clienteId: number;

  @Column(DataType.INTEGER)
  precoTotal: number;
  
  @Column(DataType.INTEGER)
  quantidadeTotal: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsTo(() => Comidas, "comidaId")
  comidas: Comidas

  @BelongsTo(() => Clientes, "clienteId")
  clientes: Clientes

}

export default Compras;
