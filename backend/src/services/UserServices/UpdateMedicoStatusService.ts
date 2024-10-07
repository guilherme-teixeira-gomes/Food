import AppError from "../../errors/AppError";
import UserCustomer from "../../models/UserCustomer";

const Sequelize = require('sequelize');

interface Return {
    msg: string,
}

const UpdateMedicoStatusService = async (id: number | string, status?: string, motivo_recusa?: string): Promise<Return> => {
    const medico = await UserCustomer.findByPk(id);

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