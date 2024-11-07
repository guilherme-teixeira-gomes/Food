/* eslint-disable */
import Comidas from "../../models/Comidas";
import Compras from "../../models/Compras";
import Clientes from "../../models/Clientes";

const ShowCardapioService = async () => {
  const cardapio = await Compras.findAll({
    include: [
      { model: Comidas },
      { model: Clientes },
    ]
  });
  return cardapio;
};

export default ShowCardapioService;

