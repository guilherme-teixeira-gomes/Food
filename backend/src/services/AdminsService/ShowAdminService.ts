/* eslint-disable */
import Administradores from "../../models/Administradores";
import AppError from "../../errors/AppError";

const ShowAdminService = async (id: string | number) => {
  const user = await Administradores.findByPk(id, {
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
      "contatoOperacional",
      "responsavePelaArea",
      "outros",
      "comercial",
      "gestor"
    ]
  });

  if (!user) {
    throw new AppError("ERRO_USUÁRIO_NÃO_ENCONTRADO", 404);
  }

  return user;
};

export default ShowAdminService;
