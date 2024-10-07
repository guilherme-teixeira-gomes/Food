/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/order */
import AppError from "../../errors/AppError";
import Admins from "../../models/Admins";
import {
  createNewAdminAccessToken,
  createNewAdminRefreshToken
} from "../../helpers/CreateTokens";
import { Op } from "sequelize";
import {
  SerializedAdmin,
  SerializedAdminModel
} from "../../helpers/SerializedAdmins";
import UserCustomer from "../../models/UserCustomer";
import Amtechs from "../../models/Amtechs";

interface Request {
  user: string;
  password: string;
}

interface Response {
  serializedAdmin: SerializedAdmin;
  token: string;
  // refreshToken: string;
}

const AuthAdminsService = async ({
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

  let admin: Admins  | UserCustomer | Amtechs | null = await Admins.findOne({
    where: {
      [Op.or]: [{ email: adminInfo }, { usuario: adminInfo }]
    }
  });
  if (!admin) {
    admin = await UserCustomer.findOne({
      where: {
        [Op.or]: [{ email: adminInfo }, { usuario: adminInfo }]
      }
    });
  }
  if (!admin) {
    admin = await Amtechs.findOne({
      where: {
        [Op.or]: [{ email: adminInfo }, { usuario: adminInfo }]
      }
    });
  } if (!admin) {
    throw new AppError("USUÁRIO_NÃO_ENCONTRADO", 401);

  }

  if (!(await admin.checkPassword(password))) {
    throw new AppError("SENHA_INVALIDA", 401);
  }

  const token = createNewAdminAccessToken(admin);
  // const refreshToken = createNewAdminRefreshToken(admin);

  const serializedAdmin = SerializedAdminModel(admin);

  return {
    serializedAdmin,
    token,
    // refreshToken
  };
};

export default AuthAdminsService;
