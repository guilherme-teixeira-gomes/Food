/* eslint-disable prefer-template */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Request, Response } from "express";
import AppError from "../errors/AppError";
import { SendRefreshToken } from "../helpers/SendRefreshToken";
import { RefreshTokenService } from "../services/AuthServices/RefreshTokenService";
import AuthLoginService from "../services/AuthServices/AuthLoginService";



export const store = async (req: Request, res: Response): Promise<Response> => {
  const { user, password } = req.body;

  const { token, serialized } = await AuthLoginService({
    user: user,
    password
  });

  SendRefreshToken(res, token);

  return res.status(200).json({
    token,
    user: serialized
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



export const remove = async (req: Request, res: Response): Promise<Response> => {
  res.clearCookie("jrt");

  return res.send();
};