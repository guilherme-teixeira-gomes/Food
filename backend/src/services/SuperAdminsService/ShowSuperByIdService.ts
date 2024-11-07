/* eslint-disable */
import Administradores from "../../models/Administradores";
import AppError from "../../errors/AppError";
import SuperAdmins from "../../models/SuperAdmins";

const ShowSuperByIdService = async (id: string | number) => {
  const amtech = await SuperAdmins.findByPk(id,{
    attributes: ["id", "admin", "name", "email"],
  });
  return amtech;
};;

export default ShowSuperByIdService;
