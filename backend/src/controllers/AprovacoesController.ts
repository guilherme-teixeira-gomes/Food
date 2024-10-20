/* eslint-disable prettier/prettier */
/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import AppError from "../errors/AppError";
import ReprovedProductService from "../services/AprovacaoService/ReprovedProductService";
import AprovedProductService from "../services/AprovacaoService/AprovedProductService";
import ShowAllFoodAprovedService from "../services/AprovacaoService/ShowAllFoodAprovedService";


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
    const reprovado = await ReprovedProductService(req.body);
    return res.status(201).json({ message: "Produto reprovado com sucesso!", reprovado });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao reprovado produto.", error });
  }
};

export const show = async (
  req: Request,
  res: Response
): Promise<Response> => {

  try {
    const data = await ShowAllFoodAprovedService();

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
