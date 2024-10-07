import Admins from "../models/Admins";
import Amtechs from "../models/Amtechs";

export interface SerializedAmtech {
  id: number;
  admin: string;
  name: string;
  email: string;
  usuario: string;
  tokenHash?: string;
}

export const SerializedAmtechModel = (admin: Amtechs): SerializedAmtech => {
  return {
    id: admin.id,
    admin: admin.admin,
    name: admin.name,
    email: admin.email,
    usuario: admin.usuario,
    tokenHash: admin.tokenHash
  };
};
