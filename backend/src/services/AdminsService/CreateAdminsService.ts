/* eslint-disable */
import * as Yup from "yup";
import { hash } from "bcryptjs";

import AppError from "../../errors/AppError";
import Administradores from "../../models/Administradores";
import { Op } from "sequelize";

interface Request {
  admin: string;
  name: string;
  email: string;
  password: string;
  whatsapp: string;
}

interface Response {
  id: number;
  admin: string;
  name: string;
  email: string;
  whatsapp: string;
}

const CreateAdminService = async ({
  admin,
  name,
  email,
  password,
  whatsapp,
}: Request): Promise<Response> => {
  const schema = Yup.object().shape({
    admin: Yup.string().required(),
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required(),
    whatsapp: Yup.string().required(),
  });

  try {
    await schema.validate({
      admin,
      name,
      email,
      password,
      whatsapp,

    });
  } catch (err: any) {
    throw new AppError(err.message);
  }

  const adminExists = await Administradores.findOne({
    where: {
      [Op.or]: [{ email: email }]
    }
  });

  if (adminExists) {
    throw new AppError("E-mail ou Usuário já cadastrado.", 409);
  }

  const hashedPassword = await hash(password, 8);

  const Admin = await Administradores.create({
    admin,
    name,
    email,
    password,
    passwordHash: hashedPassword,
    whatsapp,

  });

  return {
    id: Admin.id,
    admin: Admin.admin,
    name: Admin.name,
    email: Admin.email,
    whatsapp: Admin.whatsapp,
  }
};

export default CreateAdminService;
