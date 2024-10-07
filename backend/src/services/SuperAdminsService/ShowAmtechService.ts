/* eslint-disable */
import Administradores from "../../models/Administradores";
import AppError from "../../errors/AppError";
import SuperAdmins from "../../models/SuperAdmins";

const ShowAmtechService = async (id: string | number) => {
  const amtech = await SuperAdmins.findByPk(id, {
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
