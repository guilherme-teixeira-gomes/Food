import AppError from "../../errors/AppError";
import Clientes from "../../models/Clientes"

interface Data {
    isEspecialistaAmtech: boolean,
    operadoraId: number | null
}

export const UpdatePrestadorOperadoraService = async (id: string, { isEspecialistaAmtech, operadoraId }: Data) => {
    const prestador = await Clientes.findByPk(id);

    if (!prestador) {
        throw new AppError("Prestador não encontrado!", 404);
    }

    await prestador.update({
        isEspecialistaAmtech,
        operadoraId
    });

    return prestador;
}