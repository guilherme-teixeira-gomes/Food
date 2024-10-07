import AppError from "../../errors/AppError";
import Clientes from "../../models/Clientes";

interface Periodo {
    dataInicio: string;
    dataFim: string;
}

export const SetPeriodoAusenciaService = async (id: number | string, periodo: Periodo) => {
    const prestador = await Clientes.findByPk(id);

    if (!prestador) {
        throw new AppError("Prestador não encontrado!", 404);
    }

    const dataInicio = new Date(periodo.dataInicio);
    const dataFim = new Date(periodo.dataFim);

    const currentDate = new Date();

    const solicitarAusencia = currentDate >= dataInicio && currentDate <= dataFim;

    await prestador.update({
        ...periodo,
        solicitarAusencia,
    });

    return prestador;
}