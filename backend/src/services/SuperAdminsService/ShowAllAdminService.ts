/* eslint-disable */
import Administradores from "../../models/Administradores";
import AppError from "../../errors/AppError";
import SuperAdmins from "../../models/SuperAdmins";

const ShowAllAdminService = async () => {
  const amtech = await Administradores.findAll({
    attributes: [
      "id",
      "admin",
      "name",
      "email",
      "usuario",
      "passwordHash",
      "whatsapp",
      "tokenHash",
      "avatarPath",
      "especialistas",
      "createdAt"],
    where: {
      admin: "ADMINISTRACAO"
    }
  });
  return amtech;
};;

export default ShowAllAdminService;
