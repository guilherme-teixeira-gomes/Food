import AppError from "../../errors/AppError";
import UserCustomer from "../../models/UserCustomer";

export const FinalizarPeriodoAusenciaService = async (id: string | number) => {
    const prestador = await UserCustomer.findByPk(id);

    if (!prestador) {
        throw new AppError("Prestador não encontrado!", 404);
    }

    await prestador.update({
        solicitarAusencia: false,
        dataInicio: null,
        dataFim: null
    });

    return prestador;
}