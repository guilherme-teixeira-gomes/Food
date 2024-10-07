import { QueryInterface } from "sequelize";
import { hash } from "bcryptjs";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const passwordHash = await hash("123456", 8);
    return queryInterface.bulkInsert(
      "Amtechs",
      [
        {
          name: "Inconnet",
          id: 1,
          email: "inconnet@admin.com",
          usuario: "amtechuser",
          admin: "AMTECH",
          passwordHash,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete("Amtechs", {});
  }
};
