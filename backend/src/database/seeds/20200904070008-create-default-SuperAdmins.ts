import { QueryInterface } from "sequelize";
import { hash } from "bcryptjs";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const passwordHash = await hash("123456", 8);
    return queryInterface.bulkInsert(
      "SuperAdmins",
      [
        {
          name: "SuperAdmin",
          id: 2,
          email: "super@admin.com",
          usuario: "SuperAdmin",
          admin: "SUPERADMIN",
          passwordHash,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete("SuperAdmins", {});
  }
};
