/* eslint-disable */
import Administradores from "../../models/Administradores";
import AppError from "../../errors/AppError";
import SuperAdmins from "../../models/SuperAdmins";
import Comidas from "../../models/Comidas";

const ShowAllFoodService = async () => {
  const food = await Comidas.findAll({
  });
  return food;
};

export default ShowAllFoodService;
