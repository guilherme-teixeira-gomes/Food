/* eslint-disable */
import Comidas from "../../models/Comidas";
import Aprovacoes from "../../models/Aprovacoes";

const ShowAllFoodAprovedService = async () => {
  const food = await Aprovacoes.findAll({
    where: {
      status:"Aprovado"
    },
    include: [
      {
        model: Comidas,
       
       
      },

    ]
  });
  return food;
};;

export default ShowAllFoodAprovedService;
