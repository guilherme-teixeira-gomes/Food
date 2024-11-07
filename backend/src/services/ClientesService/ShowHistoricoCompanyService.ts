import Clientes from "../../models/Clientes";
import Compras from "../../models/Compras";
import Comidas from "../../models/Comidas";

export const ShowHistoricoComprasService = async (clienteId: number): Promise<Clientes[]> => {
    const cliente = await Clientes.findAll({
        where: {
            id: clienteId,  
        },
        include: [
            {
                model: Compras,  
                where: { clienteId }, 
                include: [
                    {
                        model: Comidas,  
                    }
                ],
            }
        ],
    });

    return cliente;  
}
export default ShowHistoricoComprasService;
