/* eslint-disable */
import * as Yup from "yup";
import { hash } from "bcryptjs";

import AppError from "../../errors/AppError";
import { Op } from "sequelize";
import Clientes from "../../models/Clientes";

interface Request {
  name: string;
  email: string;
  cpf: string;
  password: string;
}

interface Response {
  id: number;
  admin: string;
  name: string;
  email: string;
}

const CreateClientesService = async ({ name, email, password, cpf }: Request): Promise<Response> => {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required(),
    cpf: Yup.string().required(),
  
  });

  try {
    await schema.validate({
      name,
      email,
      password,
      cpf,
    });
  } catch (err: any) {
    throw new AppError(err.message);
  }



    const customerExists = await Clientes.findOne({
      where: {
        [Op.or]: [{ email: email }, { cpf: cpf }]
      }
    });

    if (customerExists) {
      throw new AppError("E-mail ou CPF já cadastrado.", 409);
    }


  const hashedPassword = await hash(password, 8);

  const customer = await Clientes.create({
    name,
    email,
    admin: "CLIENTE",
    password,
    cpf,
    passwordHash: hashedPassword
  });

  return {
    id: customer.id,
    admin: customer.admin,
    name: customer.name,
    email: customer.email,
  };
};

export default CreateClientesService;
