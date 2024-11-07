/* eslint-disable prettier/prettier */
import { sign } from "jsonwebtoken";
import authConfig from "../config/auth";
import Administradores from "../models/Administradores";
import Clientes from "../models/Clientes";
import SuperAdmins from "../models/SuperAdmins";



export const createAccessToken = (user: Clientes | Administradores  | SuperAdmins): string => {
  const { secret, expiresIn } = authConfig;

  return sign(
    {
      id: user.id,
      admin: user.admin,
      name: user.name,
      email: user.email,
    },
    secret,
    {
      expiresIn
    }
  );
};


export const createNewAdminAccessToken = (admin: Administradores  | SuperAdmins | Clientes): string => {
  const { secret, expiresIn } = authConfig;

  return sign(
    { usarname: admin.name, admin: admin.admin, id: admin.id },
    secret,
    {
      expiresIn
    }
  );
};

