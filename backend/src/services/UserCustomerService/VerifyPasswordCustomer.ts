// /* eslint-disable prettier/prettier */
// /* eslint-disable @typescript-eslint/ban-types */
// import * as Yup from "yup";
// import AppError from "../../errors/AppError";
// import Clientes from "../../models/Clientes";

// const VerifyPasswordCustomerService = async (
//   password: string
// ): Promise<Boolean> => {
//   const schema = Yup.object().shape({
//     password: Yup.string().email().required()
//   });

//   try {
//     await schema.validate({
//       password
//     })
//   } catch (err: any) {
//     throw new AppError(err.message);
//   }

//   const checkPassword = await Clientes
// };

// export default VerifyPasswordCustomerService;
