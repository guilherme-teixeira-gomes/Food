/* eslint-disable */
import Administradores from "../../models/Administradores";
import AppError from "../../errors/AppError";
import SuperAdmins from "../../models/SuperAdmins";
import Clientes from "../../models/Clientes";

const ShowAllClientesService = async () => {
  const superadmin = await Clientes.findAll({
    
  });
  return superadmin;
};;

export default ShowAllClientesService;
