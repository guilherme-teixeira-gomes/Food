import AppError from "../../errors/AppError";
import UserCustomer from "../../models/UserCustomer";

interface Return {
    msg: string,
    user: UserCustomer
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

const UpdateMedicoPerfilService = async (id: number | string, body: Body): Promise<Return> => {
    const medico = await UserCustomer.findByPk(id);

    if (!medico) {
        throw new AppError("Medico não encontrado!");
    }

    await medico.update(body);

    return {
        msg: 'Status atualizado com sucesso',
        user: medico
    };
}

export default UpdateMedicoPerfilService;