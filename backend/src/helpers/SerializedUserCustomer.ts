/* eslint-disable */
import UserCustomer from "../models/UserCustomer";

export interface SerializedCustumer {
  id: number;
  admin: string;
  name: string;
  email: string;
  crm: string;
  uf: string;
  usuario: string;
  tokenHash?: string;
}

export const SerializeUserCustomer = (
  user: UserCustomer
): SerializedCustumer => {
  return {
    id: user.id,
    admin: user.admin,
    name: user.name,
    email: user.email,
    crm: user.crm,
    uf: user.uf,
    usuario: user.usuario,
    tokenHash: user.tokenHash,

  };
};
