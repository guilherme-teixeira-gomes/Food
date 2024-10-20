import Administradores from "../../models/Administradores"

export const ShowAdminDropdownService = async (): Promise<Administradores[]> => {
    const operadora = await Administradores.findAll({
        attributes: ["id", "name"],
        where: {
            "admin": "ADMINISTRACAO"
        }
    });

    return operadora;
}