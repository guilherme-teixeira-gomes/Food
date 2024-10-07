export interface ProcedureDataTypes {
  id: number;
  admin: string;
  prioridade: boolean;
  procedimento: string;
  processo: string;
  fase: string;
  operadora: string;
  atendimento: string;
  cid: string;
  nome_responsavel: string;
  email_responsavel: string;
  nao_tem_opme?: boolean;
  tel_responsavel: string;
  motivo_nao_opme: string;
  nome_prestador: string;
  code_prestador: string;
  data_inicio: string;
  data_previsao: string;
  createdAt?: string;
  updatedAt?: string;
}
