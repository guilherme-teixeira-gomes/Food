import { Request } from "express";
import AppError from "../../errors/AppError";
import authConfig from "../../config/auth";
import { verify } from "jsonwebtoken";
import ShowAdminId from "../../services/AdminsService/GetAdminIdService";
import Administradores from "../../models/Administradores";

interface RefreshTokenPayload {
    id: string;
    tokenVersion: number | string;
    admin: string,
}

export const getAuthOperadora = async (req: Request): Promise<Administradores> => {
    const token: string = req.headers.authorization || "";

    if (!token) {
        throw new AppError("ERRO_SESSAO_EXPIRADA", 401);
    }

    const tokenWithNoBarear = token.replace("Bearer ", "");

    const decoded = verify(tokenWithNoBarear, authConfig.secret);

    const { id } = decoded as RefreshTokenPayload;

    const user = await ShowAdminId(id);

    return user;
}