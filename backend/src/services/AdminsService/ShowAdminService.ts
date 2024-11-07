/* eslint-disable */
import Administradores from "../../models/Administradores";
import AppError from "../../errors/AppError";

const ShowAdminService = async (id: string | number) => {
  const user = await Administradores.findByPk(id, {
    
  });

  if (!user) {
    throw new AppError("ERRO_USUÁRIO_NÃO_ENCONTRADO", 404);
  }

  return user;
};

export default ShowAdminService;
