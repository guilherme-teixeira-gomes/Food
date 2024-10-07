import { Sequelize } from "sequelize";
import AppError from "../../errors/AppError";
import Clientes from "../../models/Clientes";

const ShowMedicoPerfilService = async (id: number | string): Promise<Clientes> => {
    const medico = await Clientes.findByPk(id, {
        attributes: {
            include: [
                [Sequelize.literal("(select name from Administradores where Administradores.id = Clientes.operadoraId limit 1)"), "nome_operadora"]
            ]
        }
    });

    if (!medico) {
        throw new AppError("Medico nao encontrado!");
    }


    return medico;
}

export default ShowMedicoPerfilService;