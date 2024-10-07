/* eslint-disable */
import Administradores from "../../models/Administradores";
import AppError from "../../errors/AppError";
import SuperAdmins from "../../models/SuperAdmins";

const ShowSuperAdmins = async () => {
  const amtech = await SuperAdmins.findAll({
    attributes: ["id", "admin", "name", "email", "usuario","createdAt"],
  });
  return amtech;
};;

export default ShowSuperAdmins;
