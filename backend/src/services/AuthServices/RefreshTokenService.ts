/* eslint-disable */
import { verify } from "jsonwebtoken";
import { Response as Res } from "express";

import AppError from "../../errors/AppError";
import authConfig from "../../config/auth";

import {
  createAccessToken,
} from "../../helpers/CreateTokens";
import ShowAdminService from "../AdminsService/ShowAdminService";
import Clientes from "../../models/Clientes";
import Administradores from "../../models/Administradores";
import SuperAdmins from "../../models/SuperAdmins";
import ShowSuperByIdService from "../SuperAdminsService/ShowSuperByIdService";
import ShowClienteService from "../ClientesService/ShowClienteService";



interface RefreshTokenPayload {
  id: string;
  tokenVersion: number | string;
  admin: string,
}

interface Response {
  user?: Clientes | Administradores  | SuperAdmins ;
  admin?: Administradores;
  newToken: string;
  // refreshToken: string;
}

export const RefreshTokenService = async (
  res: Res,
  token: string
): Promise<Response> => {
  try {
    const decoded = verify(token, authConfig.secret);

    const { id, admin, tokenVersion, } = decoded as RefreshTokenPayload;
    let user: Clientes | Administradores  | SuperAdmins | null = null;
    if (admin === "CLIENTE") {
      user = await ShowClienteService(id);
    } else if (admin === "ADMINISTRACAO") {
      user = await ShowAdminService(id);
    } else if (admin === "SUPERADMIN" ) {
      user = await ShowSuperByIdService(id);
    } if (!user) {
      throw new AppError("ERROR_SESSÃO_EXPIRADA", 401);
    }

    const newToken = createAccessToken(user);

    return { user, newToken };
  } catch (err) {
    res.clearCookie("jrt");
    throw new AppError("ERROR_SESSÃO_EXPIRADA", 401);
  }
};
