export interface Beneficiario {
    id: number,
    nome: string,
    carterinha: string,
    plano: string,
    anterior_lei_9656_58: string,
    sexo: string,
    data_nascimento: string,
    localidade: string,
    uf: string,
    procedimentoId: number,
    createdAt: string,
    updatedAt: string
}

export interface Procedimento {
    id: number,
    procedimento: string,
    operadora: string,
    status: string,
    createdAt: string,
    beneficiarioInfo: Beneficiario[],
}

export interface Clientes {
    id: number,
    name: string,
    inativo: boolean,
}