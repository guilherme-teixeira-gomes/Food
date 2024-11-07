import Clientes from "../../models/Clientes";
import Compras from "../../models/Compras";
import Comidas from "../../models/Comidas";

export const ShowAllHistoricoComprasService = async (): Promise<Clientes[]> => {
    const clientes = await Clientes.findAll({
        include: [
            {
                model: Compras,  
                include: [
                    {
                        model: Comidas,  
                    }
                ],
            }
        ],
    });

    return clientes;  
}
export default ShowAllHistoricoComprasService;
