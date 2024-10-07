
import Aprovacoes from "../../models/Aprovacoes";
interface Request {
  id: number;         
  produtoId: number;  
  status: string;    
}

const ReprovedProductService = async ({
  id,
  produtoId,
  status,
}: Request): Promise<Aprovacoes> => {
  
  const aproved = await Aprovacoes.create({
    id,
    produtoId,
    status: "Reprovado",            
    disponivelParaCliente: false,    
  });

  return aproved;
};

export default ReprovedProductService;