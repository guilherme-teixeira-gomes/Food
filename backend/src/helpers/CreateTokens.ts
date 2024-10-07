/* eslint-disable prettier/prettier */
import { sign } from "jsonwebtoken";
import authConfig from "../config/auth";
import UserCustomer from "../models/UserCustomer";
import Admins from "../models/Admins";
import Amtechs from "../models/Amtechs";


export const createAccessToken = (user: UserCustomer | Admins  | Amtechs): string => {
  const { secret, expiresIn } = authConfig;

  return sign(
    {
      id: user.id,
      admin: user.admin,
      name: user.name,
      email: user.email,
      usuario: user.usuario
    },
    secret,
    {
      expiresIn
    }
  );
};

export const createRefreshToken = (user: UserCustomer): string => {
  const { refreshSecret, refreshExpiresIn } = authConfig;

  return sign({ id: user.id, tokenHash: user.tokenHash }, refreshSecret, {
    expiresIn: refreshExpiresIn
  });
};

export const createAdminAccessToken = (user: Admins): string => {
  const { secret, expiresIn } = authConfig;

  return sign({
    id: user.id,
    admin: user.admin,
    name: user.name,
    email: user.email,
    usuario: user.usuario,
    whatsapp: user.whatsapp,
  },
  secret,
  {
    expiresIn
  });
};

export const createAdminRefreshToken = (user: Admins): string => {
  const { refreshSecret, refreshExpiresIn } = authConfig;

  return sign({ id: user.id, tokenHash: user.tokenHash }, refreshSecret, {
    expiresIn: refreshExpiresIn
  });
}

export const createNewAccessToken = (user: UserCustomer): string => {
  const { secret, expiresIn } = authConfig;

  return sign({ usarname: user.name, admin: user.admin, id: user.id }, secret, {
    expiresIn
  });
};

export const createNewRefreshToken = (user: UserCustomer): string => {
  const { refreshSecret, refreshExpiresIn } = authConfig;

  return sign({ id: user.id, tokenVersion: 0 }, refreshSecret, {
    expiresIn: refreshExpiresIn
  });
};


export const createNewAdminAccessToken = (admin: Admins  | Amtechs | UserCustomer): string => {
  const { secret, expiresIn } = authConfig;

  return sign(
    { usarname: admin.name, admin: admin.admin, id: admin.id },
    secret,
    {
      expiresIn
    }
  );
};

export const createNewAdminRefreshToken = (admin: Admins  ): string => {
  const { secret, refreshExpiresIn } = authConfig;

  return sign({ id: admin.id, tokenVersion: 0 }, secret, {
    expiresIn: refreshExpiresIn
  });
};

export const createNewAmtechAccessToken = (amtech: Amtechs): string => {
  const { secret, expiresIn } = authConfig;

  return sign(
    { usarname: amtech.name, admin: amtech.admin, id: amtech.id },
    secret,
    {
      expiresIn
    }
  );
};

export const createNewAmtechRefreshToken = (amtech: Amtechs): string => {
  const { secret, refreshExpiresIn } = authConfig;

  return sign({ id: amtech.id, tokenVersion: 0 }, secret, {
    expiresIn: refreshExpiresIn
  });
};

