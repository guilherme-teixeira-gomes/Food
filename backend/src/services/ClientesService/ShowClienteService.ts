import Clientes from "../../models/Clientes";
import AppError from "../../errors/AppError";

/* eslint-disable */
const ShowClienteService = async (id: string | number) => {
  const user = await Clientes.findByPk(id, {
    attributes: ["id", "admin", "name",
      "email", "cpf",
     ]
  });

  if (!user) {
    throw new AppError("ERRO_USUÁRIO_NÃO_ENCONTRADO", 404);
  }

  return user;
}

export default ShowClienteService;