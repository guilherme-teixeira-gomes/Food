/* eslint-disable */
import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable("Aprovacoes", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      produtoId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "Comidas", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      disponivelParaCliente: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true 
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable("Aprovacoes");
  }
};
