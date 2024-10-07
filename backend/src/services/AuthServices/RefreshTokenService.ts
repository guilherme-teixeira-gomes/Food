/* eslint-disable */
import { verify } from "jsonwebtoken";
import { Response as Res } from "express";

import AppError from "../../errors/AppError";
import authConfig from "../../config/auth";
import UserCustomer from "../../models/UserCustomer";
import ShowUserService from "../UserCustomerService/ShowUserService";
import {
  createAccessToken,
  createRefreshToken,
  createAdminAccessToken,
  createAdminRefreshToken
} from "../../helpers/CreateTokens";
import ShowAdminService from "../AdminsService/ShowAdminService";
import Admins from "../../models/Admins";
import ShowAmtechService from "../AmtechService/ShowAmtechService";
import Amtechs from "../../models/Amtechs";

interface RefreshTokenPayload {
  id: string;
  tokenVersion: number | string;
  admin: string,
}

interface Response {
  user?: UserCustomer | Admins  | Amtechs ;
  admin?: Admins;
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
    let user: UserCustomer | Admins  | Amtechs | null = null;
    if (admin === "MEDICO") {
      user = await ShowUserService(id);
    } else if (admin === "OPERADORA") {
      user = await ShowAdminService(id);
    } else if (admin === "AMTECH" || admin === "USUARIO_AMTECH") {
      user = await ShowAmtechService(id);
    } if (!user) {
      throw new AppError("ERROR_SESSÃO_EXPIRADA", 401);
    }

    const newToken = createAccessToken(user);

    // const refreshToken = createRefreshToken(user);

    return { user, newToken };
  } catch (err) {
    res.clearCookie("jrt");
    throw new AppError("ERROR_SESSÃO_EXPIRADA", 401);
  }
};

export const RefreshAdminTokenService = async (
  res: Res,
  token: string
): Promise<Response> => {
  try {
    const decoded = verify(token, authConfig.secret);
    const { id, tokenVersion } = decoded as RefreshTokenPayload;

    const admin = await ShowAdminService(id);

    if (admin.tokenHash !== tokenVersion) {
      // res.clearCookie("jrt");
      throw new AppError("ERR_SESSION_EXPIRED", 401);
    }

    const newToken = createAdminAccessToken(admin);
    // const refreshToken = createAdminRefreshToken(admin);

    return { admin, newToken };
  } catch (error) {
    res.clearCookie("jrt");
    throw new AppError("ERROR_SESSÃO_EXPIRADA", 401);
  }
};
