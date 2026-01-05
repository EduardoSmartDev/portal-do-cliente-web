import { Projeto } from "./Types";

export default function MockProjetoData() {
     const projetoData: Projeto = {
    id: "1",
    codigo: "PROJ-2024-001",
    nome: "Casa Steel Frame - Modelo Premium",
    descricao: "Construção residencial com estrutura em steel frame e acabamento em drywall",
    cliente: {
      nome: "João Silva",
      email: "joao.silva@email.com",
      telefone: "(11) 98765-4321",
      cpf: "123.456.789-00"
    },
    endereco: {
      logradouro: "Rua das Flores",
      numero: "123",
      complemento: "Lote 5",
      bairro: "Jardim América",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01234-567"
    },
    areaConstruida: 150,
    tipologia: "Casa Térrea",
    numeroQuartos: 3,
    numeroBanheiros: 2,
    numeroVagas: 2,
    dataContrato: "2024-01-15",
    dataInicioObra: "2024-02-01",
    dataPrevisaoConclusao: "2024-08-30",
    status: "em_andamento",
    progressoGeral: 45,
    valorTotal: 350000,
    valorPago: 157500,
    saldoDevedor: 192500,
    etapas: [
      {
        id: "1",
        nome: "Fundação e Radier",
        descricao: "Preparação do terreno e execução da fundação",
        status: "concluida",
        dataInicio: "2024-02-01",
        dataPrevisao: "2024-02-20",
        dataConclusao: "2024-02-18",
        progresso: 100,
        responsavel: "Eng. Carlos Santos"
      },
      {
        id: "2",
        nome: "Estrutura Steel Frame",
        descricao: "Montagem da estrutura metálica",
        status: "concluida",
        dataInicio: "2024-02-21",
        dataPrevisao: "2024-03-15",
        dataConclusao: "2024-03-14",
        progresso: 100,
        responsavel: "Mestre João"
      },
      {
        id: "3",
        nome: "Fechamento e Cobertura",
        descricao: "Instalação de OSB, membrana e telhas",
        status: "em_andamento",
        dataInicio: "2024-03-16",
        dataPrevisao: "2024-04-10",
        progresso: 75,
        responsavel: "Mestre João"
      },
      {
        id: "4",
        nome: "Instalações Elétricas e Hidráulicas",
        descricao: "Passagem de tubulações e fiação",
        status: "em_andamento",
        dataInicio: "2024-04-01",
        dataPrevisao: "2024-04-25",
        progresso: 60,
        responsavel: "Elétrica Master"
      },
      {
        id: "5",
        nome: "Drywall - Paredes e Forros",
        descricao: "Instalação de placas de drywall",
        status: "pendente",
        dataPrevisao: "2024-05-01",
        progresso: 0,
        responsavel: "Equipe Drywall"
      },
      {
        id: "6",
        nome: "Acabamentos",
        descricao: "Pintura, pisos e revestimentos",
        status: "pendente",
        dataPrevisao: "2024-06-15",
        progresso: 0,
        responsavel: "Equipe Acabamento"
      }
    ],
    documentos: [
      {
        id: "1",
        nome: "Projeto Arquitetônico",
        tipo: "projeto",
        url: "#",
        dataUpload: "2024-01-10"
      },
      {
        id: "2",
        nome: "Contrato de Construção",
        tipo: "contrato",
        url: "#",
        dataUpload: "2024-01-15"
      },
      {
        id: "3",
        nome: "Foto do Terreno",
        tipo: "foto",
        url: "#",
        dataUpload: "2024-02-01"
      }
    ],
    medicoes: [
      {
        id: "1",
        numero: 1,
        dataEmissao: "2024-03-01",
        valorParcial: 87500,
        valorAcumulado: 87500,
        status: "paga",
        dataPagamento: "2024-03-05"
      },
      {
        id: "2",
        numero: 2,
        dataEmissao: "2024-04-01",
        valorParcial: 70000,
        valorAcumulado: 157500,
        status: "paga",
        dataPagamento: "2024-04-05"
      }
    ],
    engenheiro: "Carlos Santos - CREA 12345/SP",
    mestre: "João Pedro Oliveira",
    arquiteto: "Maria Fernandes - CAU 67890",
    observacoes: "Projeto em dia, dentro do cronograma previsto",
    ultimaAtualizacao: "2024-04-15"
  };
    return projetoData;
}