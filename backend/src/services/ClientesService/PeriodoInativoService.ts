import AppError from "../../errors/AppError";
import Clientes from "../../models/Clientes";

export const PeriodoInativoService = async (id: string | number) => {
    const cliente = await Clientes.findByPk(id);

    if (!cliente) {
        throw new AppError("Cliente não encontrado!", 404);
    }

    await cliente.update({
        solicitarAusencia: false,
        dataInicio: null,
        dataFim: null
    });

    return cliente;
}