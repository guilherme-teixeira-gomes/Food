import axios from 'axios';

interface Endereco {
    cep: string,
    logradouro: string,
    complemento: string,
    bairro: string,
    localidade: string,
    uf: string,
    ibge: string,
    gia: string,
    ddd: string,
    siafi: string
}

export async function getCEP(cep: string): Promise<Endereco | null> {
    try {
        const cepNumbers = cep.replace(/\D+/g, '');
        if (cepNumbers.length === 0) return null;
        
        const { data }: { data: Endereco } = await axios.get(`https://viacep.com.br/ws/${cepNumbers}/json`);

        return data;
    } catch (e) {
        console.log(e);
        return null;
    }
}