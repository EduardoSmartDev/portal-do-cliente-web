export type StatusProjeto = 
  | "orcamento" 
  | "aprovado" 
  | "em_andamento" 
  | "pausado" 
  | "concluido" 
  | "cancelado";

export type StatusEtapa = 
  | "pendente" 
  | "em_andamento" 
  | "concluida" 
  | "atrasada";

interface Etapa {
  id: string;
  nome: string;
  descricao: string;
  status: StatusEtapa;
  dataInicio?: string;
  dataPrevisao: string;
  dataConclusao?: string;
  progresso: number;
  responsavel?: string;
  observacoes?: string;
}

interface Documento {
  id: string;
  nome: string;
  tipo: "projeto" | "contrato" | "laudo" | "foto" | "outro";
  url: string;
  dataUpload: string;
}

interface Medicao {
  id: string;
  numero: number;
  dataEmissao: string;
  valorParcial: number;
  valorAcumulado: number;
  status: "pendente" | "aprovada" | "paga";
  dataPagamento?: string;
}

interface Cliente {
  nome: string;
  email: string;
  telefone: string;
  cpf?: string;
}

interface Endereco {
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

export interface Projeto {
  id: string;
  codigo: string;
  nome: string;
  descricao: string;
  cliente: Cliente;
  endereco: Endereco;
  areaConstruida: number;
  tipologia: string;
  numeroQuartos?: number;
  numeroBanheiros?: number;
  numeroVagas?: number;
  dataContrato: string;
  dataInicioObra?: string;
  dataPrevisaoConclusao: string;
  dataConclusao?: string;
  status: StatusProjeto;
  progressoGeral: number;
  valorTotal: number;
  valorPago: number;
  saldoDevedor: number;
  etapas: Etapa[];
  documentos: Documento[];
  medicoes: Medicao[];
  engenheiro?: string;
  mestre?: string;
  arquiteto?: string;
  observacoes?: string;
  ultimaAtualizacao: string;
}