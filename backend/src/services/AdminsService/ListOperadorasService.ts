import Admins from "../../models/Admins"

interface Reponse {
    data: Admins[]
}

export const ListOperadorasService = async (): Promise<Reponse> => {
    const admins = await Admins.findAll({
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