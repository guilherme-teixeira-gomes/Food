/* eslint-disable */
import Admins from "../../models/Admins";
import AppError from "../../errors/AppError";
import Amtechs from "../../models/Amtechs";

const ShowAmtechId = async () => {
  const amtech = await Amtechs.findAll({
    attributes: ["id", "admin", "name", "email", "usuario","createdAt"],
  });
  return amtech;
};;

export default ShowAmtechId;
