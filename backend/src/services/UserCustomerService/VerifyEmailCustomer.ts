/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
import * as Yup from "yup";
import AppError from "../../errors/AppError";
import UserCustomer from "../../models/UserCustomer";

const VerifyEmailCustomerService = async (email: string): Promise<Boolean> => {
  const schema = Yup.object().shape({
    email: Yup.string().email().required()
  });

  try {
    await schema.validate({
      email
    });
  } catch (err: any) {
    throw new AppError(err.message);
  }

  const customerExists = await UserCustomer.findOne({ where: { email } });

  if (customerExists) {
    throw new AppError("E-mail já cadastrado.", 409);
  }

  return true;
};

export default VerifyEmailCustomerService;
