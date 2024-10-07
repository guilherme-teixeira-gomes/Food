import Administradores from "../models/Administradores";
import Clientes from "../models/Clientes";
import SuperAdmins from "../models/SuperAdmins";


export interface SerializedModel {
  id: number;
  admin: string;
  email: string;
  tokenHash?: string;

}

export const SerializedService = (admin: Administradores | SuperAdmins | Clientes): SerializedModel => {


  return {
    id: admin.id,
    admin: admin.admin,
    email: admin.email,
    tokenHash: admin.tokenHash,

  };
};
