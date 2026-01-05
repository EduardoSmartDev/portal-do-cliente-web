import { FileSignature, FileText } from "lucide-react";
import { Documento } from "./Types";

export default function MockFinanceiroData() {
const TIPO_DOCUMENTO = {
  1: { descricao: 'Boleto' },
  2: { descricao: 'Planta de Projeto'},
  3: { descricao: 'Contrato' },
};

// Simulação da tabela 'documentos'
// Note que adicionei campos extras (data, valor) apenas para a UI ficar mais rica,
// mas a estrutura base (id, user_id, tipo_id, url) é a principal.
const mockDocumentos: Documento[] = [
  { id: 1, user_id: 101, tipo_id: 1, url: 'https://cloudfront.../boleto_jan.pdf', extra_info: 'Venc: 15/10/2023', nome: 'Mensalidade Outubro',tipo: TIPO_DOCUMENTO[1],data_criacao:'2023-09-01' },
  { id: 2, user_id: 101, tipo_id: 2, url: 'https://cloudfront.../planta_hidraulica.pdf', extra_info: 'Versão 1.0', nome: 'Planta Hidráulica', tipo: TIPO_DOCUMENTO[2],data_criacao:'2023-09-10' },
  { id: 3, user_id: 101, tipo_id: 3, url: 'https://cloudfront.../contrato_compra.pdf', extra_info: 'Assinado', nome: 'Contrato de Compra e Venda', tipo: TIPO_DOCUMENTO[3],data_criacao:'2023-09-15' },
  { id: 4, user_id: 101, tipo_id: 1, url: 'https://cloudfront.../boleto_fev.pdf', extra_info: 'Venc: 15/11/2023', nome: 'Mensalidade Novembro', tipo: TIPO_DOCUMENTO[1],data_criacao:'2023-10-01' },
  { id: 5, user_id: 101, tipo_id: 2, url: 'https://cloudfront.../planta_eletrica.pdf', extra_info: 'Versão Final', nome: 'Planta Elétrica', tipo: TIPO_DOCUMENTO[2],data_criacao:'2023-10-05' },
];

return mockDocumentos;

}