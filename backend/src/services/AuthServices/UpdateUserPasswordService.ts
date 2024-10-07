/* eslint-disable */
import { verify } from "jsonwebtoken";
import { hash } from "bcryptjs";
import AppError from "../../errors/AppError";
import authConfig from "../../config/auth";
import ShowUserService from "../UserCustomerService/ShowUserService";
import ShowAdminService from "../AdminsService/ShowAdminService";

interface RefreshTokenPayload {
    id: string;
    tokenVersion: number | string;
    admin: string,
}

interface Body {
    old_password: string,
    password: string,
    confirm_password: string
}

export const UpdateUserPasswordService = async (token: string, body: Body) => {
    const decoded = verify(token, authConfig.secret);

    const { old_password, password, confirm_password } = body;
    const { id, admin, } = decoded as RefreshTokenPayload;

    const user = admin === 'MEDICO'
        ? await ShowUserService(id)
        : await ShowAdminService(id);

    if (!(await user.checkPassword(old_password))) {
        throw new AppError("Senha invalida!", 400);
    }

    if (password !== confirm_password) {
        throw new AppError("O campo 'Confirmar senha' precisa ser igual a nova senha!", 400);
    }

    const hashedPassword = await hash(password, 8);

    await user.update({ passwordHash: hashedPassword });

    return { mgs: "Senha alterada com sucesso" };
};