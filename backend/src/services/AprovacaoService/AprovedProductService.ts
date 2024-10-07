
import Aprovacoes from "../../models/Aprovacoes";
interface Request {
  id: number;         
  produtoId: number;  
  status: string;    
}

const AprovedProductService = async ({
  id,
  produtoId,
  status,
}: Request): Promise<Aprovacoes> => {
  
  const aproved = await Aprovacoes.create({
    id,
    produtoId,
    status: "Aprovado",            
    disponivelParaCliente: true,    
  });

  return aproved;
};

export default AprovedProductService;