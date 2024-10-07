/* eslint-disable */
import * as Yup from "yup";
import { hash } from "bcryptjs";
import AppError from "../../errors/AppError";
import Administradores from "../../models/Administradores";
import { Op } from "sequelize";
import Comidas from "../../models/Comidas";

interface Request {
  id: number;
  produto: string;
  codigo: string;
  preco: number;
  produtoImage?: string | null;
  disponiveis: number;
  destaque: string;
  categoria: string;
  descricao:string;

}


const CreateComidaService = async ({
  id,
  produto,
  codigo,
  preco,
  disponiveis,
  destaque,
  categoria,
  produtoImage,
  descricao,

}: Request): Promise<Comidas> => {
  
  const exist = await Comidas.findOne({
    where: {
      [Op.or]: [{ codigo: codigo }]
    }
  });

  if (exist) {
    throw new AppError("Codigo já cadastrado.", 409);
  }

  const comidas = await Comidas.create({
    id,
    produto,
    codigo,
    preco,
    produtoImage,
    disponiveis,
    destaque,
    categoria,
    descricao,

  });

  return comidas
  

};

export default CreateComidaService;
