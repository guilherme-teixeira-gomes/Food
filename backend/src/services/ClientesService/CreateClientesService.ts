/* eslint-disable */
import * as Yup from "yup";
import { hash } from "bcryptjs";

import AppError from "../../errors/AppError";
import { Op } from "sequelize";
import Clientes from "../../models/Clientes";

interface Request {
  name: string;
  email: string;
  crm: string;
  usuario: string;
  rg: string;
  tipoDocumento: string;
  cpf: string;
  fase: string;
  password: string;
  isEspecialistaAmtech: boolean,
  operadoraId: number | null
}

interface Response {
  id: number;
  admin: string;
  name: string;
  email: string;
  crm: string;

  uf: string;
  usuario: string;
}

const CreateClientesService = async ({ name, email, crm, usuario, password, isEspecialistaAmtech, operadoraId, rg, cpf, tipoDocumento }: Request): Promise<Response> => {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    crm: Yup.string().required(),
    usuario: Yup.string().required(),
    password: Yup.string().required(),

    rg: Yup.string().required(),
    cpf: Yup.string().required(),
  
  });

  try {
    await schema.validate({
      name,
      email,
      crm,
      usuario,
      password,
      tipoDocumento,
      rg,
      cpf,
      isEspecialistaAmtech
    });
  } catch (err: any) {
    throw new AppError(err.message);
  }

  const crmInfo = crm;
  let outputCrm;
  const regEx = /^\d{2}\.\d{3}\.\d{2}$/;

  if (regEx.test(crmInfo)) {
    const match = crmInfo.match(regEx);
    outputCrm = match ? match[0].replace(/\./g, "") : "";
  } else {
    outputCrm = crmInfo;
  }

  if (outputCrm) {
    const customerExists = await Clientes.findOne({
      where: {
        [Op.or]: [{ email: email }, { crm: outputCrm }]
      }
    });

    if (customerExists) {
      throw new AppError("E-mail ou CRM já cadastrado.", 409);
    }
  }

  const hashedPassword = await hash(password, 8);

  const customer = await Clientes.create({
    name,
    email,
    crm: outputCrm,
    usuario,
    admin: "CLIENTES",
    status: isEspecialistaAmtech ? 'INCOMPLETO' : 'APROVADO',
    isEspecialistaAmtech,
    operadoraId,
    password,
    tipoDocumento,
    rg,
    cpf,
    passwordHash: hashedPassword
  });

  return {
    id: customer.id,
    admin: customer.admin,
    name: customer.name,
    email: customer.email,
    crm: customer.crm,
    uf: customer.uf,
    usuario: customer.usuario
  };
};

export default CreateClientesService;
