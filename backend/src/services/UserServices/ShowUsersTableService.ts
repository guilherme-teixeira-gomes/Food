import { WhereOptions, Sequelize } from "sequelize";
import UserCustomer from "../../models/UserCustomer";

interface Return {
    data: UserCustomer[],
    total: number,
    totalPages: number,
}

const ShowUsersTableService = async (page: number, operadoraId: number | null): Promise<Return> => {
    const limit = 10;
    const offset = (page - 1) * limit;

    const where: WhereOptions = {};

    if (operadoraId) {
        where.operadoraId = operadoraId;
    }

    const prestadores = await UserCustomer.findAll({
        attributes: {
            include: [
                'id', 'name', 'email', 'status', 'crm', 'createdAt', 'motivo_recusa', 'operadoraId', 'isEspecialistaAmtech', 'fase',
                [Sequelize.literal(`(select count(*) as qtd_procedimentos_ativos from prestadorProcedimento as pp where pp.prestadorId = UserCustomer.id and pp.status in ("EM ANALISE", "DEVOLUTIVA", "INFORMAÇÕES/RELATÓRIO SOLICITADOS","NOVO EXAME"))`), `qtd_procedimentos_ativos`]
            ]
        },
        // limit: limit,
        // offset: offset,
        where: {
            ...where,
            "admin": "MEDICO",
        },
        order: [["createdAt", "DESC"]]
    });

    const count = await UserCustomer.count();

    const totalPages = Math.ceil(count / limit);

    return {
        data: prestadores,
        total: count,
        totalPages,
    };
}

export default ShowUsersTableService;