/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/order */
import AppError from "../../errors/AppError";

import {
  createNewAdminAccessToken,
} from "../../helpers/CreateTokens";
import { Op } from "sequelize";

import Administradores from "../../models/Administradores";
import Clientes from "../../models/Clientes";
import SuperAdmins from "../../models/SuperAdmins";
import { SerializedModel, SerializedService } from "../../helpers/SerializedService";


interface Request {
  user: string;
  password: string;
}

interface Response {
  serialized: SerializedModel;
  token: string;
  // refreshToken: string;
}

const AuthLoginService = async ({
  user,
  password
}: Request): Promise<Response> => {
  let adminInfo: string;

  const regExEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (regExEmail.test(user)) {
    adminInfo = user;
  } else {
    adminInfo = user;
  }

  let admin: Administradores  | Clientes | SuperAdmins | null = await Administradores.findOne({
    where: {
      [Op.or]: [{ email: adminInfo }, ]
    }
  });
  if (!admin) {
    admin = await Clientes.findOne({
      where: {
        [Op.or]: [{ email: adminInfo }, ]
      }
    });
  }
  if (!admin) {
    admin = await SuperAdmins.findOne({
      where: {
        [Op.or]: [{ email: adminInfo },]
      }
    });
  } if (!admin) {
    throw new AppError("USUÁRIO_NÃO_ENCONTRADO", 401);

  }

  if (!(await admin.checkPassword(password))) {
    throw new AppError("SENHA_INVALIDA", 401);
  }

  const token = createNewAdminAccessToken(admin);

  const serialized = SerializedService(admin);

  return {
    serialized,
    token,
  };
};

export default AuthLoginService;
