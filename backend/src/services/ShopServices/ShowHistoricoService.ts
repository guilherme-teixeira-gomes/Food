// import { Benefit, Company, Partner, shops, shopwoker } from "@prisma/client";
// import prisma from "../../Prisma"
// import AppError from "../../errors/AppError";


// export const ShowHistoricoService = async (workerId:string): Promise<shopwoker[]> => {
//     const shop = await prisma.shopwoker.findMany({
//         where:{
//             workerid:workerId,
//         },
//         include: {
//             shops: true, // Inclui todos os campos relacionados da tabela packs
//         },
        
//     });

//     return shop;
// }