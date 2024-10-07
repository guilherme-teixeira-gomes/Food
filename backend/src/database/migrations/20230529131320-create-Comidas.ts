/* eslint-disable */
import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable("Comidas", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      produto: {
        type: DataTypes.STRING,
        allowNull: false
      },
      produtoImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      codigo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      preco: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      disponiveis: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      categoria: {
        type: DataTypes.STRING,
        allowNull: false
      },
      destaque: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descricao: {
        type: DataTypes.TEXT,
        allowNull: false
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
    return queryInterface.dropTable("Comidas");
  }
};
