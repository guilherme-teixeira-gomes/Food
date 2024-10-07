/* eslint-disable prettier/prettier */
/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import AppError from "../errors/AppError";
import ShowAdminId from "../services/AdminsService/GetAdminIdService";
import CreateAmtechService from "../services/AmtechService/CreateAmtechService";
import ShowAmtechId from "../services/AmtechService/ShowAmtechIdService";
import ShowAdmAmtechId from "../services/AmtechService/GetAdmAmtechIdService";
import ShowOperatorAmtechService from "../services/AmtechService/ShowOperatorAmtechService";


export const storeUsuarioAmtech = async (req: Request, res: Response): Promise<Response> => {
  const { admin, name, email, password, usuario } =
    req.body;

  try {
    const data = await CreateAmtechService({
      admin,
      name,
      email,
      password,
      usuario
    });

    return res.status(201).json({ msg: "Usuário criado com succeso", data });
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

export const getAmtechById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {  } = req.params;

  try {
    const data = await ShowAmtechId();

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

export const getAdmAmtechById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const data = await ShowAdmAmtechId(id);

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

export const getOperatorAmtechById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const data = await ShowOperatorAmtechService();

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

