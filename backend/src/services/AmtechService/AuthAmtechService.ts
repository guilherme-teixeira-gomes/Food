/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/order */
import AppError from "../../errors/AppError";
import Admins from "../../models/Admins";
import {
  createNewAmtechAccessToken
} from "../../helpers/CreateTokens";
import { Op } from "sequelize";
import {
  SerializedAdmin,
  SerializedAdminModel
} from "../../helpers/SerializedAdmins";
import Amtechs from "../../models/Amtechs";
import { SerializedAmtech, SerializedAmtechModel } from "../../helpers/SerializedAmtech";

interface Request {
  user: string;
  password: string;
}

interface Response {
  serializedAmtech: SerializedAmtech;
  token: string;
  // refreshToken: string;
}

const AuthAmtechService = async ({
  user,
  password
}: Request): Promise<Response> => {
  let amtechInfo: string;

  const regExEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (regExEmail.test(user)) {
    amtechInfo = user;
  } else {
    amtechInfo = user;
  }

  const amtech = await Amtechs.findOne({
    where: {
      [Op.or]: [{ email: amtechInfo }, { usuario: amtechInfo }]
    }
  });

  if (!amtech) {
    throw new AppError("USUARIO_NAO_ENCONTRADO", 401);
  }

  if (!(await amtech.checkPassword(password))) {
    throw new AppError("SENHA_INVALIDA", 401);
  }

  const token = createNewAmtechAccessToken(amtech);
  // const refreshToken = createNewAdminRefreshToken(admin);

  const serializedAmtech = SerializedAmtechModel(amtech);

  return {
    serializedAmtech,
    token,
    // refreshToken
  };
};

export default AuthAmtechService;
