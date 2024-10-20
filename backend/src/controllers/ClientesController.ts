/* eslint-disable */
import { Request, Response } from "express";
import AppError from "../errors/AppError";
import { UpdateUserPasswordService } from "../services/AuthServices/UpdateUserPasswordService";

import { getUserType } from "../helpers/authHelpers/getUserType";
import { getAuthOperadora } from "../helpers/authHelpers/getAuthOperadora";
import CreateClientesService from "../services/ClientesService/CreateClientesService";
import VerifyEmailCustomerService from "../services/ClientesService/VerifyEmailCustomer";
import ShowClientePerfilService from "../services/ClientesService/ShowClientePerfilService";
import UpdateClientePerfilService from "../services/ClientesService/UpdateClientePerfilService";
import ShowTabelaService from "../services/ClientesService/ShowTabelaService";
import ShowClientesTableService from "../services/ClientesService/ShowClientesTableService";


type IndexQuery = {
  searchParam: string;
  pageNumber: string;
};

export const store = async (req: Request, res: Response): Promise<Response> => {
  const { name, email, crm, uf, usuario, password, isEspecialistaAmtech, operadoraId, rg, cpf, fase, tipoDocumento } = req.body;

  try {
    const data = await CreateClientesService({
      name,
      email,
      crm,
      usuario,
      password,
      fase,
      isEspecialistaAmtech,
      operadoraId,
      tipoDocumento,
      rg,
      cpf
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

export const VerifyEmailUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email } = req.body;

  try {
    await VerifyEmailCustomerService(email);

    return res.status(200).json({ msg: "E-mail verificado!" });
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

export const updatePassword = async (req: Request, res: Response): Promise<Response> => {
  const token: string = req.headers.authorization || "";

  if (!token) {
    throw new AppError("ERRO_SESSAO_EXPIRADA", 401);
  }

  const tokenWithNoBarear = token.replace("Bearer ", "");

  await UpdateUserPasswordService(tokenWithNoBarear, req.body);

  return res.json({
    msg: "Senha alterada com sucesso!"
  });
}

export const show = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  const user = await ShowClientePerfilService(id);

  return res.json(user);
}

export const updatePerfil = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  const body = req.body;

  const user = await UpdateClientePerfilService(id, body);

  return res.json(user);
}

export const showUsersTable = async (req: Request, res: Response): Promise<Response> => {
  const { id, admin } = getUserType(req);

  const operadoraId = admin === "ADMINISTRACAO"
    ? Number(id)
    : null;

  const data = await ShowClientesTableService(1, operadoraId);

  return res.json(data);
}

export const showEspecialistaTable = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  const data = await ShowTabelaService(1, Number(id));

  return res.json(data);
}