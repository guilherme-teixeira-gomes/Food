import { Sequelize } from "sequelize";
import AppError from "../../errors/AppError";
import Clientes from "../../models/Clientes";

const ShowClientePerfilService = async (id: number | string): Promise<Clientes> => {
    const cliente = await Clientes.findByPk(id, {
        attributes: {
            include: [
                [Sequelize.literal("(select name from Administradores where Administradores.id = Clientes.operadoraId limit 1)"), "nome_operadora"]
            ]
        }
    });

    if (!cliente) {
        throw new AppError("Cliente nao encontrado!");
    }


    return cliente;
}

export default ShowClientePerfilService;