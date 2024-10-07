/* eslint-disable */
import { Request, Response } from "express";
import AppError from "../errors/AppError";
import CreateUserCustomerService from "../services/UserCustomerService/CreateUserCustomer";
import VerifyEmailCustomerService from "../services/UserCustomerService/VerifyEmailCustomer";
import VerifyCRMCustomerService from "../services/UserCustomerService/VerifyCrmCustomer";
import ShowUsersTableService from "../services/UserServices/ShowUsersTableService";
import UpdateMedicoStatusService from "../services/UserServices/UpdateMedicoStatusService";
import ShowMedicoPerfilService from "../services/UserServices/ShowMedicoPerfilService";
import UpdateMedicoPerfilService from "../services/UserServices/UpdateMedicoPerfilService";
import { UpdateUserPasswordService } from "../services/AuthServices/UpdateUserPasswordService";
import { UpdatePrestadorOperadoraService } from "../services/UserServices/UpdatePrestadorOperadoraService";
import { getUserType } from "../helpers/authHelpers/getUserType";
import { getAuthOperadora } from "../helpers/authHelpers/getAuthOperadora";
import ShowEspecialistaTableService from "../services/UserServices/ShowEspecialistaTableService";
import { SetPeriodoAusenciaService } from "../services/UserServices/SetPeriodoAusenciaService";
import { FinalizarPeriodoAusenciaService } from "../services/UserServices/FinalizarPeriodoAusenciaService";

type IndexQuery = {
  searchParam: string;
  pageNumber: string;
};

export const store = async (req: Request, res: Response): Promise<Response> => {
  const { name, email, crm, uf, usuario, password, isEspecialistaAmtech, operadoraId, rg, cpf, fase, tipoDocumento } = req.body;

  try {
    const data = await CreateUserCustomerService({
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

export const VerifyCrmUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { crm } = req.body;

  try {
    await VerifyCRMCustomerService(crm);

    return res.status(200).json({ msg: "CRM verificado!" });
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

export const show = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  const user = await ShowMedicoPerfilService(id);

  return res.json(user);
}

export const updatePerfil = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  const body = req.body;

  const user = await UpdateMedicoPerfilService(id, body);

  return res.json(user);
}

export const showUsersTable = async (req: Request, res: Response): Promise<Response> => {
  const { id, admin } = getUserType(req);

  const operadoraId = admin === "OPERADORA"
    ? Number(id)
    : null;

  const data = await ShowUsersTableService(1, operadoraId);

  return res.json(data);
}

export const showEspecialistaTable = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  const data = await ShowEspecialistaTableService(1, Number(id));

  return res.json(data);
}

export const updateMedicoStatus = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  await UpdateMedicoStatusService(id);

  return res.json({ msg: "Status atualizado com sucesso!" });
}

export const aprovarMedicoPerfil = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  await UpdateMedicoStatusService(id, "APROVADO");

  return res.json({ msg: "Status atualizado com sucesso!" });
}

export const recusarMedicoPerfil = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { motivo_recusa } = req.body

  await UpdateMedicoStatusService(id, "RECUSADO", motivo_recusa);

  return res.json({ msg: "Status atualizado com sucesso!" });
}

export const updateOperadora = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { isEspecialistaAmtech, operadoraId } = req.body

  await UpdatePrestadorOperadoraService(id, { isEspecialistaAmtech, operadoraId });

  return res.json("Dados atualizados com sucesso!");
}

export const setPeriodoAusencia = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const data: { dataInicio: string; dataFim: string; } = req.body;

  await SetPeriodoAusenciaService(id, data);

  return res.json("Período de Ausência configurado com sucesso!");
}

export const finalizarPeriodoAusencia = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  await FinalizarPeriodoAusenciaService(id);

  return res.json("Período de Ausência finalizado com sucesso!");
}