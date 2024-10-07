/* eslint-disable */
import * as Yup from "yup";
import { hash } from "bcryptjs";

import AppError from "../../errors/AppError";
import Administradores from "../../models/Administradores";
import { Op } from "sequelize";
import SuperAdmins from "../../models/SuperAdmins";

interface Request {
  admin: string;
  name: string;
  email: string;
  usuario: string;
  password: string;
}

interface Response {
  id: number;
  admin: string;
  name: string;
  email: string;
  usuario: string;

}

const CreateSuperAdminService = async ({
  admin,
  name,
  email,
  password,
  usuario,

}: Request): Promise<Response> => {
  const schema = Yup.object().shape({
    admin: Yup.string().required(),
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    usuario: Yup.string().required(),
    password: Yup.string().required(),
  });

  try {
    await schema.validate({
      admin,
      name,
      email,
      usuario,
      password,
    });
  } catch (err: any) {
    throw new AppError(err.message);
  }

  const superexist = await SuperAdmins.findOne({
    where: {
      [Op.or]: [{ email: email }, { usuario: usuario }]
    }
  });

  if (superexist) {
     throw new AppError("E-mail ou Usuário já cadastrado.", 409);
  }

  const hashedPassword = await hash(password, 8);

  const supers = await SuperAdmins.create({
    admin,
    name,
    email,
    usuario,
    password,
    passwordHash: hashedPassword,

  });

  return {
    id: supers.id,
    admin: supers.admin,
    name: supers.name,
    email: supers.email,
    usuario: supers.usuario,
  }
};

export default CreateSuperAdminService;
