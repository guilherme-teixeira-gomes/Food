import AppError from "../../errors/AppError";
import UserCustomer from "../../models/UserCustomer"

interface Data {
    isEspecialistaAmtech: boolean,
    operadoraId: number | null
}

export const UpdatePrestadorOperadoraService = async (id: string, { isEspecialistaAmtech, operadoraId }: Data) => {
    const prestador = await UserCustomer.findByPk(id);

    if (!prestador) {
        throw new AppError("Prestador não encontrado!", 404);
    }

    await prestador.update({
        isEspecialistaAmtech,
        operadoraId
    });

    return prestador;
}