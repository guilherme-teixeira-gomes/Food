/* eslint-disable no-cond-assign */
/* eslint-disable no-constant-condition */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */
/* eslint-disable dot-notation */
/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable import/no-duplicates */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable spaced-comment */
import * as Yup from "yup";
import Clientes from "../../models/Clientes";
import { NodeMailer } from "../../libs/nodemailer-old";
import ResetPassWord from "../../models/ResetPassword";
import AppError from "../../errors/AppError";

interface Request {
  email: string;
}

interface Response {
  email: string;
  name: string;
  id: number;
  profile?: string;
}

export const SendEmailPasswordRecovery = async (
  email: string,
  tokenReset?: string
): Promise<String> => {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required()
      .test("Check-email", "Email não registrado.", async value => {
        if (!value) return false;
        const emailExists = await Clientes.findOne({
          where: { email: value }
        });
        return !!emailExists;
      })
  });

  try {
    await schema.validate({ email });
  } catch (err: any) {
    throw new AppError(err.message);
  }

  let contentNodeMailer = {
    sentNameTo: "Pedro",
    sentReceiverTo: email,
    content: {
      nameConnection: "",
      nameCompany: ""
    },
    emailContent: "passwordRecovery",
    email: ""
  };

  if (Boolean(tokenReset))
    Object.defineProperty(contentNodeMailer, "tokenRecovery", {
      value: tokenReset
    });

  NodeMailer(contentNodeMailer);

  return email;
};

export const CreateTokenService = async (
  email: string
): Promise<ResetPassWord> => {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required()
      .test("Check-email", "Email não registrado.", async value => {
        if (!value) return false;
        const emailExists = await Clientes.findOne({
          where: { email: value }
        });
        return !!emailExists;
      })
  });

  try {
    await schema.validate({ email });
  } catch (err: any) {
    throw new AppError(err.message);
  }

  const verifyEmail = await Clientes.findAll({ where: { email }, raw: true });

  if ((verifyEmail.length = 0))
    throw new AppError("E-mail ainda não cadastrado", 403);

  await ResetPassWord.destroy({ where: { email } });

  return ResetPassWord.create({ email });
};

export const VerifyTokenService = async (
  token: string
): Promise<ResetPassWord> => {
  const tokenRecord = await ResetPassWord.findOne({
    where: { tokenHash: token }
  });

  if (!tokenRecord) throw new AppError("Token inválido .", 403);

  return tokenRecord;
};

export const UpdateUserPasswordByEmailService = async (emailRequest : string, newPassword: string): Promise<Clientes> => {
  const user = await Clientes.findOne({where:{email:emailRequest}});

  if (!user) throw new AppError("User not found .",404);

  await user.update({password:newPassword});


  return user;
};

export const DeleteToken = async (token: string): Promise<number> => {
  return ResetPassWord.destroy({ where: { tokenHash: token } });
};
