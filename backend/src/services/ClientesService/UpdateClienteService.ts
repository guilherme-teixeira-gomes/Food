import AppError from "../../errors/AppError";
import Clientes from "../../models/Clientes"

interface Data {
    operadoraId: number | null
}

export const UpdateClienteService = async (id: string, { operadoraId }: Data) => {
    const cliente = await Clientes.findByPk(id);

    if (!cliente) {
        throw new AppError("Cliente não encontrado!", 404);
    }

    await cliente.update({
        operadoraId
    });

    return cliente;
}