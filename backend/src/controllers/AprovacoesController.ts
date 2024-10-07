/* eslint-disable prettier/prettier */
/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import AppError from "../errors/AppError";
import ShowAllFoodService from "../services/ComidaService/ShowAllFoodService";
import AprovedProductService from "../services/AprovacoesService/AprovedProductService";
import ReprovedProductService from "../services/AprovacoesService/ReprovedProductService";



export const aproved = async (req: Request, res: Response): Promise<Response> => {
  try {
    const aproved = await AprovedProductService(req.body);
    return res.status(201).json({ message: "Produto aprovado com sucesso!", aproved });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao aprovar produto.", error });
  }
};

export const reproved = async (req: Request, res: Response): Promise<Response> => {
  try {
    const aproved = await ReprovedProductService(req.body);
    return res.status(201).json({ message: "Produto Reprovado!", aproved });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao Reprovado produto.", error });
  }
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
