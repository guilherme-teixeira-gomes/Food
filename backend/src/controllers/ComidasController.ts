/* eslint-disable prettier/prettier */
/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import AppError from "../errors/AppError";

import ShowAllFoodService from "../services/ComidaService/ShowAllFoodService";
import CreateComidaService from "../services/ComidaService/CreateComidaService";



export const store = async (req: Request, res: Response): Promise<Response> => {


  const {
    id,
    produto,
    codigo,
    preco,
    disponiveis,
    destaque,
    categoria,
    descricao, } = req.body;

    const produtoImage = req.file ? `public/uploads/comidas/${req.file.filename}` : null;



  const data = await CreateComidaService({
    id,
    produto,
    codigo,
    produtoImage,
    preco,
    disponiveis,
    destaque,
    categoria,
    descricao,

  });

  return res.status(201).json({
    msg: "Comida cadastrada com succeso",
    data
  });
};

export const show = async (
  req: Request,
  res: Response
): Promise<Response> => {

  try {
    const data = await ShowAllFoodService();

    return res.status(200).json({data})
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    } else {
      const exception = new Error((error as Error).message);
      console.error(error);
      return res.status(500).json({ error: exception.message });
    }
  }
};
