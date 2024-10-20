import { Request } from "express";
import AppError from "../../errors/AppError";
import authConfig from "../../config/auth";
import { verify } from "jsonwebtoken";
import Clientes from "../../models/Clientes";
import ShowClienteService from "../../services/ClientesService/ShowClienteService";

interface RefreshTokenPayload {
    id: string;
    tokenVersion: number | string;
    admin: string,
}

export const getAuthPrestador = async (req: Request): Promise<Clientes> => {
    const token: string = req.headers.authorization || "";

    if (!token) {
        throw new AppError("ERRO_SESSAO_EXPIRADA", 401);
    }

    const tokenWithNoBarear = token.replace("Bearer ", "");

    const decoded = verify(tokenWithNoBarear, authConfig.secret);

    const { id } = decoded as RefreshTokenPayload;

    const user = await ShowClienteService(id);

    return user;
}