import Admins from "../models/Admins";
import Amtechs from "../models/Amtechs";
import UserCustomer from "../models/UserCustomer";

export interface SerializedAdmin {
  id: number;
  admin: string;
  email: string;
  tokenHash?: string;

}

export const SerializedAdminModel = (admin: Admins | Amtechs | UserCustomer): SerializedAdmin => {


  return {
    id: admin.id,
    admin: admin.admin,
    email: admin.email,
    tokenHash: admin.tokenHash,

  };
};
