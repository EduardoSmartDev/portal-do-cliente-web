"use client";
import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  User,
  Clock,
  ArrowRight,
  Layers,
  Plus,
  X, // Ícone de fechar
  Printer, // Ícone para "Imprimir" (decorativo)
  Download, // Ícone para "Baixar" (decorativo)
  Hash, // Ícone para quantidade
} from "lucide-react";
import { Orcamento, StatusOrcamento } from "./utils/Types";
import Header from "../header/Header";
import { UserSession } from "@/lib/Types";

// --- Helpers de Formatação e Estilo ---

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("pt-BR");

// Configuração visual dos STATUS DOS CARDS
const CARD_STATUS_CONFIG: Record<StatusOrcamento, { label: string; style: string }> = {
  rascunho: { label: "Rascunho", style: "bg-gray-100 text-gray-600 border-gray-200" },
  enviado: { label: "Enviado", style: "bg-blue-50 text-blue-700 border-blue-200" },
  em_analise: { label: "Em Análise", style: "bg-amber-50 text-amber-700 border-amber-200" },
  aprovado: { label: "Aprovado", style: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  rejeitado: { label: "Rejeitado", style: "bg-red-50 text-red-700 border-red-200" },
  expirado: { label: "Expirado", style: "bg-orange-50 text-orange-700 border-orange-200" },
};

// --- DADOS DO PROJETO ---
const projetoData = {
  nome: "Residencial Jardins",
  codigo: "ESP-2024-001",
  status: "em_andamento"
};

const getStatusColor = (status: string) => {
  const map: Record<string, string> = {
    em_andamento: 'bg-green-100 text-green-800',
    atrasado: 'bg-red-100 text-red-800',
    concluido: 'bg-blue-100 text-blue-800',
  };
  return map[status] || 'bg-gray-100 text-gray-800';
};

const getStatusLabel = (status: string) => {
  const map: Record<string, string> = {
    em_andamento: 'Em Andamento',
    atrasado: 'Atrasado',
    concluido: 'Concluído',
  };
  return map[status] || status;
};

// --- Componente Principal ---

interface OrcamentosListProps {
  orcamentos: Orcamento[];
  user?:UserSession;
}

export default function OrcamentosListLSF({ orcamentos, user }: OrcamentosListProps) {
  // STATE: Controla qual orçamento está aberto no modal (null = fechado)
  const [selectedOrcamento, setSelectedOrcamento] = useState<Orcamento | null>(null);

  // Handlers
  const handleOpenModal = (orcamento: Orcamento) => {
    setSelectedOrcamento(orcamento);
    // Opcional: Desabilitar scroll do body quando modal abre
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedOrcamento(null);
    document.body.style.overflow = 'unset';
  };

  // Tratamento para lista vazia
  if (!orcamentos?.length) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-linear-to-r from-gray-700 to-gray-600 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
             <h1 className="text-2xl font-bold text-white">Projeto {projetoData.codigo}</h1>
          </div>
        </header>
        <div className="flex flex-col items-center justify-center py-20 m-8 bg-white rounded-2xl border-2 border-dashed border-gray-200">
          <Layers size={48} className="text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Nenhum orçamento encontrado</h3>
          <p className="text-gray-500 mb-6">Comece criando uma nova proposta de Steel Frame.</p>
          <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm">
             + Novo Orçamento
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      
      {/* HEADER */}
      <Header title="Gestão de Orçamentos" subtitle={`Projeto: ${projetoData.codigo}`}></Header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        <div className="flex items-center justify-between mb-6">
            <div>
                <h2 className="text-xl font-bold text-gray-800">Propostas Comerciais</h2>
                <span className="text-sm text-gray-500">{orcamentos.length} registros encontrados</span>
            </div>
            
            <button className="bg-gray-900 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
                <Plus size={18} />
                <span className="hidden sm:inline">Novo Orçamento</span>
            </button>
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {orcamentos.map((orcamento) => {
            const status = CARD_STATUS_CONFIG[orcamento.status];

            return (
              <div
                key={orcamento.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-300 group flex flex-col"
              >
                {/* Card Header */}
                <div className="p-5 border-b border-gray-100">
                  <div className="flex justify-between items-start mb-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${status.style}`}>
                      {status.label}
                    </span>
                    <span className="text-xs font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded">
                      {orcamento.numero}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-orange-600 transition-colors">
                    {orcamento.titulo}
                  </h3>

                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                      <User size={14} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 font-medium">Cliente</span>
                      <span className="text-sm text-gray-700 font-medium truncate max-w-50">
                        {orcamento.cliente.nome}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-gray-400 mt-0.5 shrink-0" />
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {orcamento.endereco.logradouro}, {orcamento.endereco.numero}
                      {" - "}
                      {orcamento.endereco.cidade}/{orcamento.endereco.estado}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                      <span className="text-xs text-gray-400 block mb-1">Área (LSF)</span>
                      <span className="text-sm font-semibold text-gray-700">
                        {orcamento.areaConstruida ? `${orcamento.areaConstruida} m²` : "--"}
                      </span>
                    </div>
                    <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                      <span className="text-xs text-gray-400 block mb-1">Prazo</span>
                      <div className="flex items-center gap-1.5">
                        <Clock size={12} className="text-orange-500" />
                        <span className="text-sm font-semibold text-gray-700">
                          {orcamento.prazoExecucao ? `${orcamento.prazoExecucao} dias` : "--"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-400 pt-1">
                    <Calendar size={12} />
                    <span>Emitido em: {formatDate(orcamento.dataEmissao)}</span>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-5 pt-0 mt-auto">
                  <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">Total Estimado</p>
                      <p className="text-xl font-bold text-gray-900">
                        {formatCurrency(orcamento.valorTotal)}
                      </p>
                    </div>

                    {/* --- BOTÃO DE AÇÃO (TRIGGER) --- */}
                    <button 
                        onClick={() => handleOpenModal(orcamento)}
                        className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-600 hover:bg-gray-900 hover:text-white transition-all cursor-pointer"
                    >
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* --- MODAL DE DETALHES --- */}
      {selectedOrcamento && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop (Fundo escuro) */}
          <div 
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
            onClick={handleCloseModal}
          ></div>

          {/* Container do Modal */}
          <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-2xl">
              <div>
                  <div className="flex items-center gap-3">
                     <h3 className="text-xl font-bold text-gray-900">{selectedOrcamento.titulo}</h3>
                     <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${CARD_STATUS_CONFIG[selectedOrcamento.status].style}`}>
                        {CARD_STATUS_CONFIG[selectedOrcamento.status].label}
                     </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 font-mono">
                      {selectedOrcamento.numero} • Emitido em {formatDate(selectedOrcamento.dataEmissao)}
                  </p>
              </div>
              <button 
                onClick={handleCloseModal}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                
                {/* Seção 1: Cliente e Endereço */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <User size={16} /> Dados do Cliente
                        </h4>
                        <div className="space-y-1 text-sm text-gray-600">
                            <p><span className="font-medium text-gray-900">Nome:</span> {selectedOrcamento.cliente.nome}</p>
                            <p><span className="font-medium text-gray-900">Email:</span> {selectedOrcamento.cliente.email}</p>
                            <p><span className="font-medium text-gray-900">Telefone:</span> {selectedOrcamento.cliente.telefone}</p>
                            {selectedOrcamento.cliente.cpf && <p><span className="font-medium text-gray-900">CPF:</span> {selectedOrcamento.cliente.cpf}</p>}
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <MapPin size={16} /> Endereço da Obra
                        </h4>
                        <div className="space-y-1 text-sm text-gray-600">
                            <p>{selectedOrcamento.endereco.logradouro}, {selectedOrcamento.endereco.numero}</p>
                            <p>{selectedOrcamento.endereco.bairro}</p>
                            <p>{selectedOrcamento.endereco.cidade} - {selectedOrcamento.endereco.estado}</p>
                            <p className="text-xs text-gray-400 mt-1">CEP: {selectedOrcamento.endereco.cep}</p>
                        </div>
                    </div>
                </div>

                {/* Seção 2: Itens do Orçamento */}
                <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Layers size={20} className="text-orange-600" /> 
                        Itens e Materiais (LSF/Drywall)
                    </h4>
                    
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Qtd</th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Unitário</th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {selectedOrcamento.itens.length > 0 ? (
                                    selectedOrcamento.itens.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">{item.descricao}</div>
                                                <div className="text-xs text-gray-500 capitalize">{item.categoria.replace(/_/g, " ")}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                                                {item.quantidade} <span className="text-xs text-gray-400">{item.unidade}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                                                {formatCurrency(item.valorUnitario)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                                                {formatCurrency(item.valorTotal)}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-500">
                                            Nenhum item cadastrado neste orçamento.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                            <tfoot className="bg-gray-50">
                                <tr>
                                    <td colSpan={3} className="px-6 py-3 text-right text-sm font-medium text-gray-500">Subtotal:</td>
                                    <td className="px-6 py-3 text-right text-sm font-bold text-gray-900">{formatCurrency(selectedOrcamento.subtotal)}</td>
                                </tr>
                                {/* Exemplo de como mostrar descontos se existirem */}
                                {selectedOrcamento.descontoValor ? (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-2 text-right text-sm font-medium text-green-600">Descontos:</td>
                                        <td className="px-6 py-2 text-right text-sm font-bold text-green-600">- {formatCurrency(selectedOrcamento.descontoValor)}</td>
                                    </tr>
                                ) : null}
                            </tfoot>
                        </table>
                    </div>
                </div>

                {/* Seção 3: Resumo Financeiro (Cards Pequenos) */}
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                     <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                         <p className="text-xs text-gray-500 uppercase">Valor Total</p>
                         <p className="text-2xl font-bold text-gray-900">{formatCurrency(selectedOrcamento.valorTotal)}</p>
                     </div>
                     <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                         <p className="text-xs text-gray-500 uppercase">Condição Pagamento</p>
                         <p className="text-sm font-medium text-gray-900 mt-1">
                             {selectedOrcamento.condicoesPagamento?.numeroParcelas || 1}x de {formatCurrency(selectedOrcamento.condicoesPagamento?.valorParcela || selectedOrcamento.valorTotal)}
                         </p>
                     </div>
                     <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                         <p className="text-xs text-gray-500 uppercase">Validade</p>
                         <p className="text-sm font-medium text-gray-900 mt-1">Até {formatDate(selectedOrcamento.dataValidade)}</p>
                     </div>
                 </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-2xl flex justify-between items-center">
                <button 
                    className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                    <Printer size={16} /> Imprimir
                </button>

                <div className="flex gap-3">
                    <button 
                        onClick={handleCloseModal}
                        className="px-4 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium"
                    >
                        Fechar
                    </button>
                    <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
                        <Download size={16} /> Exportar PDF
                    </button>
                </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}