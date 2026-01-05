import { Home, Calendar, DollarSign, FileText, TrendingUp, Clock, MapPin, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { Projeto, StatusEtapa, StatusProjeto } from './utils/Types';

interface ProjetoPageProps {
  projeto: Projeto;
}

export default function ProjetoPage({ projeto }: ProjetoPageProps) {
  // Dados de exemplo caso o projeto esteja vazio
 const projetoData: Projeto = projeto; 
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value || 0);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status: StatusProjeto) => {
    const colors = {
      orcamento: 'bg-gray-100 text-gray-700',
      aprovado: 'bg-blue-100 text-blue-700',
      em_andamento: 'bg-orange-100 text-orange-700',
      pausado: 'bg-yellow-100 text-yellow-700',
      concluido: 'bg-green-100 text-green-700',
      cancelado: 'bg-red-100 text-red-700'
    };
    return colors[status] || colors.orcamento;
  };

  const getStatusLabel = (status: StatusProjeto) => {
    const labels = {
      orcamento: 'Orçamento',
      aprovado: 'Aprovado',
      em_andamento: 'Em Andamento',
      pausado: 'Pausado',
      concluido: 'Concluído',
      cancelado: 'Cancelado'
    };
    return labels[status] || status;
  };

  const getEtapaStatusColor = (status: StatusEtapa) => {
    const colors = {
      pendente: 'bg-gray-200',
      em_andamento: 'bg-orange-500',
      concluida: 'bg-green-500',
      atrasada: 'bg-red-500'
    };
    return colors[status] || colors.pendente;
  };

  const getEtapaIcon = (status: StatusEtapa) => {
    if (status === 'concluida') return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (status === 'atrasada') return <AlertCircle className="w-5 h-5 text-red-600" />;
    return <Clock className="w-5 h-5 text-gray-400" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-linear-to-r from-gray-700 to-gray-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white p-2 rounded-lg">
                <div className="flex flex-col space-y-1">
                  <div className="h-2 w-16 bg-gray-500"></div>
                  <div className="h-2 w-16 bg-orange-500"></div>
                  <div className="h-2 w-16 bg-gray-600"></div>
                </div>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  {projetoData.nome || "Meu Projeto"}
                </h1>
                <p className="mt-1 text-sm text-orange-300">
                  Código: {projetoData.codigo || "N/A"}
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <div className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(projetoData.status)}`}>
                {getStatusLabel(projetoData.status)}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Progresso Geral</p>
                <p className="text-2xl font-bold text-gray-900">{projetoData.progressoGeral}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-500" />
            </div>
            <div className="mt-4 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-orange-500 h-2 rounded-full transition-all"
                style={{ width: `${projetoData.progressoGeral}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Área Construída</p>
                <p className="text-2xl font-bold text-gray-900">{projetoData.areaConstruida}m²</p>
              </div>
              <Home className="w-8 h-8 text-blue-500" />
            </div>
            <p className="mt-2 text-sm text-gray-500">{projetoData.tipologia}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Valor Pago</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(projetoData.valorPago)}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Total: {formatCurrency(projetoData.valorTotal)}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Conclusão Prevista</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatDate(projetoData.dataPrevisaoConclusao)}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-purple-500" />
            </div>
            {projetoData.dataInicioObra && (
              <p className="mt-2 text-sm text-gray-500">
                Início: {formatDate(projetoData.dataInicioObra)}
              </p>
            )}
          </div>
        </div>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Esquerda - Etapas */}
          <div className="lg:col-span-2 space-y-6">
            {/* Etapas da Obra */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Etapas da Obra</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {projetoData.etapas?.map((etapa, index) => (
                    <div key={etapa.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className="mt-1">
                            {getEtapaIcon(etapa.status)}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{etapa.nome}</h3>
                            <p className="text-sm text-gray-600 mt-1">{etapa.descricao}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                              <span>Previsão: {formatDate(etapa.dataPrevisao)}</span>
                              {etapa.responsavel && (
                                <span>• {etapa.responsavel}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="ml-4">
                          <span className="text-sm font-semibold text-gray-700">
                            {etapa.progresso}%
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${getEtapaStatusColor(etapa.status)}`}
                          style={{ width: `${etapa.progresso}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Documentos */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Documentos
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {projetoData.documentos?.map((doc) => (
                    <a
                      key={doc.id}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">{doc.nome}</p>
                          <p className="text-sm text-gray-500">
                            Enviado em {formatDate(doc.dataUpload)}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                        {doc.tipo}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Direita - Informações */}
          <div className="space-y-6">
            {/* Informações do Projeto */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Informações do Projeto</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Localização
                  </p>
                  {projetoData.endereco && (
                    <>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        {projetoData.endereco.logradouro}, {projetoData.endereco.numero}
                      </p>
                      <p className="text-sm text-gray-600">
                        {projetoData.endereco.bairro}, {projetoData.endereco.cidade} - {projetoData.endereco.estado}
                      </p>
                    </>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Características</p>
                  <div className="grid grid-cols-3 gap-2">
                    {projetoData.numeroQuartos && (
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <p className="text-lg font-bold text-gray-900">{projetoData.numeroQuartos}</p>
                        <p className="text-xs text-gray-600">Quartos</p>
                      </div>
                    )}
                    {projetoData.numeroBanheiros && (
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <p className="text-lg font-bold text-gray-900">{projetoData.numeroBanheiros}</p>
                        <p className="text-xs text-gray-600">Banheiros</p>
                      </div>
                    )}
                    {projetoData.numeroVagas && (
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <p className="text-lg font-bold text-gray-900">{projetoData.numeroVagas}</p>
                        <p className="text-xs text-gray-600">Vagas</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Equipe */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Equipe
              </h2>
              <div className="space-y-3">
                {projetoData.engenheiro && (
                  <div>
                    <p className="text-sm text-gray-600">Engenheiro</p>
                    <p className="font-medium text-gray-900">{projetoData.engenheiro}</p>
                  </div>
                )}
                {projetoData.arquiteto && (
                  <div>
                    <p className="text-sm text-gray-600">Arquiteto</p>
                    <p className="font-medium text-gray-900">{projetoData.arquiteto}</p>
                  </div>
                )}
                {projetoData.mestre && (
                  <div>
                    <p className="text-sm text-gray-600">Mestre de Obras</p>
                    <p className="font-medium text-gray-900">{projetoData.mestre}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Financeiro */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Resumo Financeiro</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Valor Total</span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(projetoData.valorTotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Valor Pago</span>
                  <span className="font-semibold text-green-600">
                    {formatCurrency(projetoData.valorPago)}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-200">
                  <span className="text-gray-600">Saldo Devedor</span>
                  <span className="font-semibold text-orange-600">
                    {formatCurrency(projetoData.saldoDevedor)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}