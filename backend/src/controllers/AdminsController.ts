import { Request, Response } from "express";
import AppError from "../errors/AppError";
import CreateAdminService from "../services/AdminsService/CreateAdminsService";
import ShowAdminId from "../services/AdminsService/GetAdminIdService";
import UpdateAdminPerfilService from "../services/AdminsService/UpdateAdminPerfilService";
import { ListAdminsService } from "../services/AdminsService/ListAdminsService";
import { ShowAdminDropdownService } from "../services/AdminsService/ShowAdminDropdownService";



export const index = async (req: Request, res: Response): Promise<Response> => {
  const administradores = await ListAdminsService();

  return res.json(administradores);
}

export const store = async (req: Request, res: Response): Promise<Response> => {
  const { admin, name, email, password, usuario, whatsapp, especialistas, contatoOperacional, responsavePelaArea, outros, comercial, gestor } = req.body;

  try {
    const data = await CreateAdminService({
      admin,
      name,
      email,
      password,
      usuario,
      whatsapp,
      especialistas,
      contatoOperacional,
      responsavePelaArea,
      outros,
      comercial,
      gestor
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

export const updatePerfil = async (req: Request, res: Response): Promise<Response> => {
  const file = req.file as Express.Multer.File;
  const { id } = req.params;

  const body = req.body;

  const user = await UpdateAdminPerfilService(id, body, file?.path || null);

  return res.json(user);
}

export const getAdminById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const data = await ShowAdminId(id);

    return res.status(200).json({ data })
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

export const dropdown = async (req: Request, res: Response): Promise<Response> => {
  const administradores = await ShowAdminDropdownService();

  return res.json(administradores);
}