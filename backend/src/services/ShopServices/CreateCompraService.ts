
import AppError from "../../errors/AppError";
import Compras from "../../models/Compras";


interface Request {
  id: number
  comidaId: number,
  clienteId: number,
  precoTotal: number,
  quantidadeTotal: number,
}
const CreateCompraService = async ({
  id,
  comidaId,
  clienteId,
  precoTotal,
  quantidadeTotal,

}: Request): Promise<Compras> => {

  const compras = await Compras.create({
    id,
    comidaId,
    clienteId,
    precoTotal,
    quantidadeTotal,

  });

  return compras


};

export default CreateCompraService;
