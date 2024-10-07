/* eslint-disable prefer-template */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Request, Response } from "express";
import AppError from "../errors/AppError";
import AuthUserCustomerService from "../services/UserCustomerService/AuthCustomerService";
import AuthAdminsService from "../services/AdminsService/AuthAdminsService";
import { SendRefreshToken } from "../helpers/SendRefreshToken";
import { RefreshAdminTokenService, RefreshTokenService } from "../services/AuthServices/RefreshTokenService";
import AuthAmtechService from "../services/AmtechService/AuthAmtechService";

export const store = async (req: Request, res: Response): Promise<Response> => {
  const { user, password } = req.body;

  const { token, serializedAdmin } = await AuthAdminsService({
    user: user,
    password
  });

  SendRefreshToken(res, token);

  return res.status(200).json({
    token,
    user: serializedAdmin
  });
};

export const update = async (req: Request, res: Response): Promise<Response> => {
  const token: string = req.headers.authorization || "";

  if (!token) {
    throw new AppError("ERRO_SESSAO_EXPIRADA", 401);
  }

  const tokenWithNoBarear = token.replace("Bearer ", "");

  const { user, newToken } = await RefreshTokenService(
    res,
    tokenWithNoBarear
  );

  SendRefreshToken(res, newToken);

  return res.json({ token: newToken, user });
}

export const updateAdmin = async (req: Request, res: Response): Promise<Response> => {
  const token: string = req.headers.authorization || "";

  if (!token) {
    throw new AppError("ERRO_SESSAO_EXPIRADA", 401);
  }

  const { admin, newToken } = await RefreshAdminTokenService(res, token)

  SendRefreshToken(res, newToken);

  return res.json({ token: newToken, admin });
}

export const updateUserOperadora = async (req: Request, res: Response): Promise<Response> => {
  const token: string = req.headers.authorization || "";

  if (!token) {
    throw new AppError("ERRO_SESSAO_EXPIRADA", 401);
  }

  const { admin, newToken } = await RefreshTokenService(res, token)

  SendRefreshToken(res, newToken);

  return res.json({ token: newToken, admin });
}


export const remove = async (req: Request, res: Response): Promise<Response> => {
  res.clearCookie("jrt");

  return res.send();
};