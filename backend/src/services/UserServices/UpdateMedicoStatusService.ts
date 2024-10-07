import AppError from "../../errors/AppError";
import Clientes from "../../models/Clientes";

const Sequelize = require('sequelize');

interface Return {
    msg: string,
}

const UpdateMedicoStatusService = async (id: number | string, status?: string, motivo_recusa?: string): Promise<Return> => {
    const medico = await Clientes.findByPk(id);

    if (!medico) {
        throw new AppError("Medico nao encontrado!");
    }

    const newStatus = status ? status : 'EM ANALISE';

    await medico.update({
        status: newStatus,
        motivo_recusa: motivo_recusa || null
    });

    return {
        msg: 'Status atualizado com sucesso'
    };
}

export default UpdateMedicoStatusService;