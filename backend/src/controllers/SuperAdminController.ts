/* eslint-disable prettier/prettier */
/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import AppError from "../errors/AppError";
import CreateSuperAdminService from "../services/SuperAdminsService/CreateSuperAdminService";
import ShowSuperAdmins from "../services/SuperAdminsService/ShowSuperAdmins";
import ShowAllAdminService from "../services/SuperAdminsService/ShowAllAdminService";
import ShowSuperByIdService from "../services/SuperAdminsService/ShowSuperByIdService";
import ShowAllHistoricoComprasService from "../services/SuperAdminsService/ShowAllHistoricoComprasService";
import ShowAllClientesService from "../services/SuperAdminsService/ShowAllClientesService";



export const store = async (req: Request, res: Response): Promise<Response> => {
  const { admin, name, email, password, usuario } =
    req.body;

  try {
    const data = await CreateSuperAdminService({
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

export const show = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {  } = req.params;

  try {
    const data = await ShowSuperAdmins();

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

export const showById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const data = await ShowSuperByIdService(id);

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

export const showAllAdmin = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const data = await ShowAllAdminService();

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

export const showAllClientes = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const data = await ShowAllClientesService();

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

export const historico = async (req: Request, res: Response): Promise<Response> => {
  const clientes = await ShowAllHistoricoComprasService();

  return res.json(clientes);
}

