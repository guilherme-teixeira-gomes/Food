import AppError from "../../errors/AppError";
import Administradores from "../../models/Administradores";
import Clientes from "../../models/Clientes";

interface Return {
    msg: string,
    user: Administradores
}

interface Body {
    admin: string;
    name: string;
    email: string;
    usuario: string;
    password: string;
    whatsapp: string;
    contatoOperacional:string;
    responsavePelaArea: string;
    outros: string;
    comercial: string;
    gestor: string;
}

const UpdateAdminPerfilService = async (id: number | string, body: Body, avatarPath?: string  | null): Promise<Return> => {

    const operador = await Administradores.findByPk(id);

    if (!operador) {
        throw new AppError("Operador nao encontrado!");
    }

    operador.update(body);


    await operador.save(); // Salva as alterações no banco de dados

    return {
        msg: 'Status atualizado com sucesso',
        user: operador
    };
};


export default UpdateAdminPerfilService;