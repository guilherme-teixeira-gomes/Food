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
  tableName: "Comidas",
  timestamps: true
})
class Comidas extends Model<Comidas> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column(DataType.STRING)
  produto: string;
  
  @Column(DataType.STRING)
  produtoImage: string;

  @Column(DataType.STRING)
  codigo: string;

  @Column(DataType.INTEGER)
  preco: number;
  
  @Column(DataType.INTEGER)
  disponiveis: number;

  @Column(DataType.STRING)
  categoria: string;

  @Column(DataType.STRING)
  destaque: string;

  @Column(DataType.STRING)
  descricao: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

}

export default Comidas;
