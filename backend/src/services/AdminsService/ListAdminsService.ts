import Administradores from "../../models/Administradores"

interface Reponse {
    data: Administradores[]
}

export const ListAdminsService = async (): Promise<Reponse> => {
    const admins = await Administradores.findAll({
        attributes: [
            "id",
            "name",
            "email",
            "usuario",
            "createdAt",
            "contatoOperacional",
            "responsavePelaArea",
            "outros",
            "comercial",
            "gestor"]
    });

    return {
        data: admins
    };
}