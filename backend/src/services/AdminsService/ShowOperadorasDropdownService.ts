import Admins from "../../models/Admins"

export const ShowOperadorasDropdownService = async (): Promise<Admins[]> => {
    const operadora = await Admins.findAll({
        attributes: ["id", "name"],
        where: {
            "admin": "OPERADORA"
        }
    });

    return operadora;
}