/* eslint-disable */
import * as Yup from "yup";
import AppError from "../../errors/AppError";
import UserCustomer from "../../models/UserCustomer";

const VerifyCRMCustomerService = async (crm: string): Promise<Boolean> => {
  const schema = Yup.object().shape({
    crm: Yup.string().required(),
  });

  try {
    await schema.validate({
      crm,
    });
  } catch (err: any) {
    throw new AppError(err.message);
  }
  crm = crm.replace(/^\d{2}\.\d{3}\.\d{2}$/, "")
  const customerExists = await UserCustomer.findOne({ where: { crm } });

  if (customerExists) {
    throw new AppError("CPF já cadastrado.", 409);
  }


  return true;
};

export default VerifyCRMCustomerService;
