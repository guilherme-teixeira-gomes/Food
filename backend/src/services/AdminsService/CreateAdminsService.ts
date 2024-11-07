/* eslint-disable */
import * as Yup from "yup";
import { hash } from "bcryptjs";

import AppError from "../../errors/AppError";
import Administradores from "../../models/Administradores";
import { Op } from "sequelize";

interface Request {
  id: number;
  name: string;
  password: string;
  cpf: string;
  admin: string;
  email: string;
  cargo: string;
  whatsapp: string;
  uf: string;
  cep: string;
}

const CreateAdminService = async ({
  name,
  cpf,
  admin,
  email,
  password,
  cargo,
  whatsapp,
  uf,
  cep
}: Request): Promise<Administradores> => {
  const schema = Yup.object().shape({
    admin: Yup.string().required(),
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required(),
    cpf: Yup.string().required(),
  });

  try {
    await schema.validate({
      name,
      cpf,
      admin,
      email,
      password,
      cargo,
      whatsapp,
      uf,
      cep

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
    name,
    cpf,
    admin,
    email,
    password,
    cargo,
    whatsapp,
    uf,
    cep,
    passwordHash: hashedPassword,
 

  });

  return Admin
};

export default CreateAdminService;
