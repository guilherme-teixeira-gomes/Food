/* eslint-disable */
import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable("Administradores", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      admin: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      service: {
        type: DataTypes.STRING,
        allowNull: false
      },
      usuario: {
        type: DataTypes.STRING,
        allowNull: false
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
      },
      whatsapp: {
        type: DataTypes.STRING,
        allowNull: false
      },
      uf: {
        type: DataTypes.STRING(2),
        allowNull: false
      },
      cep: {
        type: DataTypes.STRING,
        allowNull: false
      },
      tokenHash: {
        type: DataTypes.STRING,
        allowNull: true
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
    return queryInterface.dropTable("Administradores");
  }
};
