/* eslint-disable no-else-return */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/order */
import { Request, Response } from "express";
import { getIO } from "../libs/socket";
import AppError from "../errors/AppError";
import { logger } from "../utils/logger";
import { verify } from "crypto";
import {
  CreateTokenService,
  SendEmailPasswordRecovery,
  VerifyTokenService,
  UpdateUserPasswordByEmailService,
  DeleteToken
} from "../services/UserServices/RecoverPasswordUserService";

type IndexQuery = {
  searchParam: string;
  pageNumber: string;
};

interface updatePresenceParams {
  status: string | number;
  userId: string | number;
}

export const store = async (req: Request, res: Response): Promise<Response> => {
  const { email } = req.body;

  try {
    const token = await CreateTokenService(email);
    await SendEmailPasswordRecovery(email, token.tokenHash);

    return res.status(201).json({
      msg: "E-mail enviado com sucesso!",
      email: token.email,
      tokenHash: token.tokenHash
    });
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

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { token, newPassword } = req.body;

  try {
    const tokenRecord = await VerifyTokenService(String(token));

    UpdateUserPasswordByEmailService(tokenRecord.email, newPassword).then(
      async () => {
        await DeleteToken(tokenRecord.tokenHash);
      }
    );

    return res.status(200).json({ msg: "Senha atualizada com sucesso!" });
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

export const VerifyToken = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { token } = req.query;

  try {
    await VerifyTokenService(String(token));

    return res
      .status(200)
      .json({ msg: "Token verificado com sucesso!", token });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    } else {
      const exception = new Error((error as Error).message);
      console.error(exception);
      return res
        .status(500)
        .json({ error: "Não foi possivel autenticar seu token " });
    }
  }
};
