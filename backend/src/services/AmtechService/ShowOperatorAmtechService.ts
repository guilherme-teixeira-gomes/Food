/* eslint-disable */
import Admins from "../../models/Admins";
import AppError from "../../errors/AppError";
import Amtechs from "../../models/Amtechs";

const ShowOperatorAmtechService = async () => {
  const amtech = await Admins.findAll({
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
      admin: "OPERADORA"
    }
  });
  return amtech;
};;

export default ShowOperatorAmtechService;
