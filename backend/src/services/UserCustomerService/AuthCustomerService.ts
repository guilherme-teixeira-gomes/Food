/* eslint-disable */
import AppError from "../../errors/AppError";
import {
  createNewAccessToken,
  createNewRefreshToken
} from "../../helpers/CreateTokens";
import { Op } from "sequelize";
import UserCustomer from "../../models/UserCustomer";
import {
  SerializeUserCustomer,
  SerializedCustumer
} from "../../helpers/SerializedUserCustomer";

interface Request {
  userID: string;
  password: string;
}

interface Response {
  serializedCustomer: SerializedCustumer;
  token: string;
  // refreshToken: string;
}

const AuthUserCustomerService = async ({
  userID,
  password
}: Request): Promise<Response> => {
  let userInfo: string;

  const regExEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regExCrm = /^\d{2}\.\d{3}\.\d{2}$/;

  if (regExEmail.test(userID)) {
    userInfo = userID;
  }

  if (regExCrm.test(userID)) {
    const match = userID.match(regExCrm);
    const outputCrm = match ? match[0].replace(/\./g, "") : "";
    userInfo = outputCrm;
  } else {
    userInfo = userID;
  }

  const user = await UserCustomer.findOne({
    where: {
      [Op.or]: [{ email: userInfo }, { crm: userInfo }]
    }
  });

  if (!user) {
    console.log("Usuário nao encontrado!");
    throw new AppError("ERR_INVALID_CREDENTIALS", 401);
  }

  if (!(await user.checkPassword(password))) {
    throw new AppError("ERR_INVALID_CREDENTIALS", 401);
  }

  const token = createNewAccessToken(user);
  // const refreshToken = createNewRefreshToken(user);

  const serializedCustomer = SerializeUserCustomer(user);

  return {
    serializedCustomer,
    token,
    // refreshToken
  };
};

export default AuthUserCustomerService;
