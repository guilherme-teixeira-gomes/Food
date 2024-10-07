import { QueryInterface } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert(
      "Companies",
      [
        {
          id: 2,
          name: "WhatsAll",
          cnpj: "000000000000000000",
          maxWhatsapps: 5,
          maxUsers: 20,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete("Companies", {});
  }
};
