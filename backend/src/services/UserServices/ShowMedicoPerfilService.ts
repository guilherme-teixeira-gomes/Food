import { Sequelize } from "sequelize";
import AppError from "../../errors/AppError";
import UserCustomer from "../../models/UserCustomer";

const ShowMedicoPerfilService = async (id: number | string): Promise<UserCustomer> => {
    const medico = await UserCustomer.findByPk(id, {
        attributes: {
            include: [
                [Sequelize.literal("(select name from Admins where Admins.id = UserCustomer.operadoraId limit 1)"), "nome_operadora"]
            ]
        }
    });

    if (!medico) {
        throw new AppError("Medico nao encontrado!");
    }


    return medico;
}

export default ShowMedicoPerfilService;