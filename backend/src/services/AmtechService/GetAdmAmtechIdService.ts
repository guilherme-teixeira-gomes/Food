/* eslint-disable */
import Admins from "../../models/Admins";
import AppError from "../../errors/AppError";
import Amtechs from "../../models/Amtechs";

const ShowAdmAmtechId = async (id: string | number) => {
  const amtech = await Amtechs.findByPk(id,{
    attributes: ["id", "admin", "name", "email", "usuario"],
  });
  return amtech;
};;

export default ShowAdmAmtechId;
