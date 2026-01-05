// types.ts

export type StatusOrcamento = 
  | "rascunho" | "enviado" | "em_analise" | "aprovado" | "rejeitado" | "expirado";

export type UnidadeMedida = 
  | "m²" | "m³" | "m" | "un" | "kg" | "l" | "cj" | "vb" | "chapa" | "barra" | "rl"; // Adicionei 'chapa', 'barra', 'rl' (rolo)

// AQUI ESTÁ A MUDANÇA PRINCIPAL PARA LSF/DRYWALL
export type CategoriaItem = 
  | "projetos_e_legalizacao"
  | "fundacao_radier"        // Específico para LSF
  | "estrutura_aco"          // Montantes, guias, vigas
  | "fechamento_externo"     // OSB, Glasroc, Cimentícia
  | "fechamento_interno"     // Drywall, gesso
  | "isolamentos"            // Lã de vidro/pet/rocha
  | "cobertura_shingle"      // Comum em LSF
  | "instalacoes_eletricas"
  | "instalacoes_hidraulicas"
  | "esquadrias"
  | "acabamentos"
  | "mao_de_obra"
  | "frete_logistica";

export interface ItemOrcamento {
  id: string;
  codigo?: string;
  descricao: string;
  categoria: CategoriaItem;
  unidade: UnidadeMedida;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  observacoes?: string;
}

export interface TotalizadorCategoria {
  categoria: CategoriaItem;
  nomeCategoria: string;
  quantidade: number;
  valorTotal: number;
  percentual: number;
}

export interface CondicoesPagamento {
  entrada?: number; 
  valorEntrada?: number;
  numeroParcelas: number;
  valorParcela: number;
  observacoes?: string;
}

export interface Cliente {
  nome: string;
  email: string;
  telefone: string;
  cpf?: string;
  cnpj?: string;
}

export interface Endereco {
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

export interface Orcamento {
  id: string;
  numero: string; 
  titulo: string;
  descricao?: string;
  cliente: Cliente;
  endereco: Endereco;
  dataEmissao: string;
  dataValidade: string;
  dataAprovacao?: string;
  status: StatusOrcamento;
  areaConstruida?: number;
  tipologia?: string;
  prazoExecucao?: number; 
  itens: ItemOrcamento[];
  totalizadores: TotalizadorCategoria[];
  subtotal: number;
  descontoPercentual?: number;
  descontoValor?: number;
  acrescimoPercentual?: number;
  acrescimoValor?: number;
  valorTotal: number;
  condicoesPagamento?: CondicoesPagamento;
  observacoes?: string;
  termosCondicoes?: string;
  responsavel?: string;
  empresa?: {
    nome: string;
    cnpj?: string;
    telefone?: string;
    email?: string;
  };
  ultimaAtualizacao: string;
}