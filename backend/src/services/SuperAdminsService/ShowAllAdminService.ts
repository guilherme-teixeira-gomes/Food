/* eslint-disable */
import Administradores from "../../models/Administradores";
import AppError from "../../errors/AppError";
import SuperAdmins from "../../models/SuperAdmins";

const ShowAllAdminService = async () => {
  const superadmin = await Administradores.findAll({
    
  });
  return superadmin;
};;

export default ShowAllAdminService;
