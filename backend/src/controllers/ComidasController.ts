/* eslint-disable prettier/prettier */
/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import AppError from "../errors/AppError";
import CreateComidaService from "../services/ComidaService/CreateComidaService";



export const store = async (req: Request, res: Response): Promise<Response> => {


  const {
    id,
    produto,
    codigo,
    preco,
    disponiveis,
    destaque,
    categoria,
    descricao, } = req.body;

    const produtoImage = req.file ? req.file.filename : null;


  const data = await CreateComidaService({
    id,
    produto,
    codigo,
    produtoImage,
    preco,
    disponiveis,
    destaque,
    categoria,
    descricao,

  });

  return res.status(201).json({
    msg: "Comida cadastrada com succeso",
    data
  });
};

// export const index = async (req: Request, res: Response): Promise<Response> => {
//   try {
//     const data = await ShowCargoService();

//     return res.status(200).json({ data })
//   } catch (error) {
//     if (error instanceof AppError) {
//       return res.status(error.statusCode).json({ error: error.message });
//     } else {
//       const exception = new Error((error as Error).message);
//       console.error(error);
//       return res.status(500).json({ error: exception.message });
//     }
//   }
// };

// export const dropdown = async (req: Request, res: Response): Promise<Response> => {
//   const data = await CargoDropdownService();

//   return res.json(data);
// }

// export const showCargos = async (req: Request, res: Response): Promise<Response> => {
//   const { id } = req.params;
//   const search = req.query.search

//   const data = await ShowCargosEmpTableService(Number(id), search);

//   return res.json(data);
// }


// export const getCargoId = async (req: Request, res: Response): Promise<Response> => {
//   const { id } = req.params;

//   try {
//     const data = await GetCargoIdService(id);

//     return res.status(200).json({ data })
//   } catch (error) {
//     if (error instanceof AppError) {
//       return res.status(error.statusCode).json({ error: error.message });
//     } else {
//       const exception = new Error((error as Error).message);
//       console.error(error);
//       return res.status(500).json({ error: exception.message });
//     }
//   }
// };

// export const update = async (req: Request, res: Response): Promise<Response> => {
//   const { id } = req.params;

//   const body = req.body;

//   const user = await UpdateCargoService(id, body);

//   return res.json(user);
// }


// export const showCargosForFunc = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   const { setorId } = req.params;
//   try {
//     const data = await ShowCargoForFuncService(setorId);

//     return res.status(200).json({ data })
//   } catch (error) {
//     if (error instanceof AppError) {
//       return res.status(error.statusCode).json({ error: error.message });
//     } else {
//       const exception = new Error((error as Error).message);
//       console.error(error);
//       return res.status(500).json({ error: exception.message });
//     }
//   }
// };

// export const table = async (req: Request, res: Response): Promise<Response> => {
//   const search = req.query.search
//   const empresa = req.query.empresa as string | undefined;

//   const riscos = await ShowCargosTableService(search,empresa);

//   return res.json(riscos);
// }


// export const getQtdTotalCargos = async (req: Request, res: Response): Promise<Response> => {
//   const empresa = req.query.empresa as string | undefined;
//   const result = await GetQtdCargosService(empresa);

//   return res.json(result[0].total_cargos);
// };


// export const getCargosDash = async (req: Request, res: Response): Promise<Response> => {
//   const result = await GetPorcentagemCargosService();

//   return res.json(result);
// };

// export const getCargosDashPorMes = async (req: Request, res: Response): Promise<Response> => {
//   const result = await GetQuantidadeCargosPorMesService();

//   return res.json(result);
// };

// export const destroy = async (req: Request, res: Response) => {
//   const { id } = req.params;

//   await DeleteCargoService(id);

//   return res.json({
//     msg: "Resultado excluido com sucesso!"
//   });
// };

// export const getQtdTotalCargosIdFiltro = async (req: Request, res: Response): Promise<Response> => {
//   const result = await GetQtdCargosIdService(req);

//   return res.json(result[0].total);
// };
