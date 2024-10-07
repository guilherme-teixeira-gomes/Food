/* eslint-disable */
import Admins from "../../models/Admins";
import AppError from "../../errors/AppError";
import Amtechs from "../../models/Amtechs";

const ShowAmtechService = async (id: string | number) => {
  const amtech = await Amtechs.findByPk(id, {
    attributes: [
      "id",
      "admin",
      "name",
      "email",
      "usuario",
      "passwordHash",
      "tokenHash"
    ]
  });

  if (!amtech) {
    throw new AppError("ERRO_USUÁRIO_NÃO_ENCONTRADO", 404);
  }

  return amtech;
};

export default ShowAmtechService;
