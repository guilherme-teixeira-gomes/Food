/* eslint-disable */
import * as Yup from "yup";
import { hash } from "bcryptjs";

import AppError from "../../errors/AppError";
import Admins from "../../models/Admins";
import { Op } from "sequelize";
import Amtechs from "../../models/Amtechs";

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

const CreateAmtechService = async ({
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

  const adminExists = await Amtechs.findOne({
    where: {
      [Op.or]: [{ email: email }, { usuario: usuario }]
    }
  });

  if (adminExists) {
     throw new AppError("E-mail ou Usuário já cadastrado.", 409);
  }

  const hashedPassword = await hash(password, 8);

  const Amtech = await Amtechs.create({
    admin,
    name,
    email,
    usuario,
    password,
    passwordHash: hashedPassword,

  });

  return {
    id: Amtech.id,
    admin: Amtech.admin,
    name: Amtech.name,
    email: Amtech.email,
    usuario: Amtech.usuario,
  }
};

export default CreateAmtechService;
