/* eslint-disable */
import Administradores from "../../models/Administradores";
import AppError from "../../errors/AppError";

const ShowAdminId = async (id: string | number) => {
  const user = await Administradores.findByPk(id, {
    attributes: [
      "id",
      "admin",
      "name",
      "email",
      "usuario",
      "whatsapp",
      "especialistas",
      "avatarPath",
      "contatoOperacional",
      "responsavePelaArea",
      "outros",
      "comercial",
      "gestor" // Inclua o avatarPath nos atributos retornados
    ]
  });

  if (!user) {
    throw new AppError("ERRO_USUÁRIO_NÃO_ENCONTRADO", 404);
  }

  return user;
};

export default ShowAdminId;
