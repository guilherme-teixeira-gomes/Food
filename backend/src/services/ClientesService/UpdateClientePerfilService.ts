import AppError from "../../errors/AppError";
import Clientes from "../../models/Clientes";

interface Return {
    msg: string,
    user: Clientes
}

interface Body {
    name: string,
    descricao: string,
    endereco: string,
    cidade: string,
    uf: string,
    telefone: string,
    email: string,
    fase: string;
    rg: string,
    cpf: string,
    nascimento: string,
    inativo: Boolean,
    solicitarAusencia: Boolean
    dataInicio: string,
    dataFim: string
}

const UpdateClientePerfilService = async (id: number | string, body: Body): Promise<Return> => {
    const cliente = await Clientes.findByPk(id);

    if (!cliente) {
        throw new AppError("Cliente não encontrado!");
    }

    await cliente.update(body);

    return {
        msg: 'Status atualizado com sucesso',
        user: cliente
    };
}

export default UpdateClientePerfilService;