import { Request, Response } from "express";
import CreateCompraService from "../services/ShopServices/CreateCompraService";
import ShowCardapioService from "../services/ShopServices/ShowCardapioService";
import AppError from "../errors/AppError";




// export const show = async (req: Request, res: Response): Promise<Response> => {
//     const companyId = req.query.companyId as string;
//     const shop = await ShowProductsShopService(companyId);
  
//     return res.json(shop);
//   }

//   export const getInfos = async (req: Request, res: Response): Promise<Response> => {
//     const { id } = req.params;

//     const shop = await GetShopInfoService(id);

//     return res.json({
//         status: "ok",
//         data: shop
//     });
// }

  

// export const getShopsConfig = async (req: Request, res: Response): Promise<Response> => {
//     const companyId = req.query.companyId as string;

//     const shops = await FindShopConfigService(companyId);

//     return res.json({
//         status: "ok",
//         data: shops
//     });
// }


// export const store = async (req: Request, res: Response): Promise<Response> => {
//     let produtoimage = '';

//     if (req.file) {
//         produtoimage = process.env.BACKEND_URL + "/" + req.file.path;
//     }

//     const shop = await StoreProductShopService({
//         produtoimage,
//         ...req.body
//     });

//     return res.json({
//         status: "ok",
//         data: shop
//     });
// }

// export const sell = async (req: Request, res: Response): Promise<Response> => {

//     const shop = await SellProductCompanyService(req.body);
  
//     return res.json(shop);
//   }




export const buy = async (req: Request, res: Response): Promise<Response> => {
  const { id, comidaId, clienteId, precoTotal, quantidadeTotal } = req.body;

  const data = await CreateCompraService({
      id,
      comidaId,
      clienteId,
      precoTotal,
      quantidadeTotal,
  });

  return res.status(201).json({
    msg: "Compra efetuada com sucesso",
    data
  });
};

  
  export const show = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
  
    try {
      const data = await ShowCardapioService();
  
      return res.status(200).json({data})
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ error: error.message });
      } else {
        const exception = new Error((error as Error).message);
        console.error(error);
        return res.status(500).json({ error: exception.message });
      }
    }
  };
  

// export const historico = async (req: Request, res: Response): Promise<Response> => {
//     const workerId = req.query.workerId as string;
//     const shop = await ShowHistoricoService(workerId);
  
//     return res.json(shop);
//   }

//   export const homeProductShop = async (req: Request, res: Response): Promise<Response> => {
// ;

//     const homeProductRequets: any[] = [
//         GetProductsShopsByCompanyService(companyId)
//     ];

//     const results = await Promise.all(homeProductRequets);

//     return res.json({
//         shops: [
//             ...results[0],
//             // If there are no more results, do not attempt to spread `results[1]`
//         ],
//     });
// }

// export const update = async (req: Request, res: Response): Promise<Response> => {
//     const { id } = req.params;
//     let produtoimage = undefined;


//     if (req.file) {
//         produtoimage = process.env.BACKEND_URL + "/" + req.file.path;
//     }
//     const shop = await UpdateProductShopService(id, {
//         produtoimage,
//         ...req.body
//     });
//     return res.json({
//         status: "ok",
//         data: shop
//     });
// }

// export const destroy = async (req: Request, res: Response) => {
//     const { id } = req.params;
  
//     await DeleteProductShopService(id);
  
//     return res.json({
//       msg: "Resultado excluido com sucesso!"
//     });
//   };

//   export const destroyColab = async (req: Request, res: Response) => {
//     const { id } = req.params;
  
//     await DeleteProductShopColabService(id);
  
//     return res.json({
//       msg: "Resultado excluido com sucesso!"
//     });
//   };
  