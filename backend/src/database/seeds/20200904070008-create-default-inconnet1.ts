import { QueryInterface } from "sequelize";
import { hash } from "bcryptjs";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const passwordHash = await hash("123456", 8);
    return queryInterface.bulkInsert(
      "Amtechs",
      [
        {
          name: "Inconnet1",
          id: 2,
          email: "matheusfgoncalves12@gmail.com",
          usuario: "amtechuser1",
          admin: "AMTECH1",
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
