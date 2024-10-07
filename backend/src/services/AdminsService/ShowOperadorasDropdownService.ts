import Administradores from "../../models/Administradores"

export const ShowOperadorasDropdownService = async (): Promise<Administradores[]> => {
    const operadora = await Administradores.findAll({
        attributes: ["id", "name"],
        where: {
            "admin": "OPERADORA"
        }
    });

    return operadora;
}