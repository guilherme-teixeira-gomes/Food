import { Request } from "express";
import AppError from "../../errors/AppError";
import authConfig from "../../config/auth";
import { verify } from "jsonwebtoken";


interface RefreshTokenPayload {
    id: string;
    admin: string,
}
export const getUserType = (req: Request) => {
    const token: string = req.headers.authorization || "";

    if (!token) {
        throw new AppError("ERRO_SESSAO_EXPIRADA", 401);
    }

    const tokenWithNoBarear = token.replace("Bearer ", "");

    const decoded = verify(tokenWithNoBarear, authConfig.secret);

    const { id, admin } = decoded as RefreshTokenPayload;

    return { id, admin };
}