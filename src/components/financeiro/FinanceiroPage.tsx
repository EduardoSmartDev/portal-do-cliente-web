"use client";
import { useState } from "react";
import {
  FileText,
  Map,
  FileSignature,
  X,
  Download,
  Eye,
  Calendar,
  Bolt
} from "lucide-react";
import { Documento } from "./utils/Types";
import Header from "../header/Header";
import { UserSession } from "@/lib/Types";

const STYLE_MAP: Record<
  number,
  { icon: any; color: string; bg: string; labelDefault: string }
> = {
  1: {
    labelDefault: "Boleto",
    icon: FileText,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  2: {
    labelDefault: "Planta de Projeto",
    icon: Map,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  3: {
    labelDefault: "Contrato",
    icon: FileSignature,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
};

const DEFAULT_STYLE = {
  labelDefault: "Documento",
  icon: FileText,
  color: "text-gray-600",
  bg: "bg-gray-100",
};

const projetoData = {
  nome: "Residencial Jardins",
  codigo: "ESP-2024-001",
  status: "em_andamento",
};

interface DocumentoPageProps {
  documentos: Documento[];
  user?:UserSession;
}

export default function PaginaFinanceiro({ documentos, user }: DocumentoPageProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<Documento | null>(null);

  // Simula o Fetch ao carregar a página

  // Helpers de Estilo do Header
  const getStatusColor = (status: string) => {
    const map: Record<string, string> = {
      em_andamento: "bg-green-100 text-green-800",
      atrasado: "bg-red-100 text-red-800",
      concluido: "bg-blue-100 text-blue-800",
    };
    return map[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusLabel = (status: string) => {
    const map: Record<string, string> = {
      em_andamento: "Em Andamento",
      atrasado: "Atrasado",
      concluido: "Concluído",
    };
    return map[status] || status;
  };

  // Handlers do Modal
  const handleOpenDoc = (doc: Documento) => {
    setSelectedDoc(doc);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDoc(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* HEADER */}
     <Header title="Documentos do Projeto" subtitle={`Projeto: ${projetoData.codigo}`} user={user}></Header>
      {/* CONTEÚDO */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl text-gray-800">Documentos do Projeto:</h2>
            <span className="text-xl font-bold">{projetoData.nome}</span> 
          </div>
          <Bolt size={32} className="text-orange-500 space-y-1 justify-start"></Bolt>
          <span className="text-sm text-gray-500">
            {documentos.length} arquivos disponíveis
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {documentos.map((doc) => {
            // LÓGICA DE VALIDAÇÃO VISUAL NO FRONTEND
            // Pegamos o estilo baseado no ID, se não existir, usamos o Default
            const visualStyle = STYLE_MAP[doc.tipo_id] || DEFAULT_STYLE;
            const IconComponent = visualStyle.icon;

            // Formatando data simples
            const dataFormatada = new Date(doc.data_criacao).toLocaleDateString(
              "pt-BR"
            );

            return (
              <div
                key={doc.id}
                onClick={() => handleOpenDoc(doc)}
                className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-orange-200 transition-all cursor-pointer group overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    {/* Renderiza o ícone com as cores definidas no STYLE_MAP */}
                    <div
                      className={`p-3 rounded-lg ${visualStyle.bg} ${visualStyle.color}`}
                    >
                      <IconComponent size={24} />
                    </div>

                    <div className="bg-gray-50 text-gray-400 p-1.5 rounded-md group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors">
                      <Eye size={18} />
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">
                      {/* Usa a descrição do objeto 'tipo' se existir (join do banco), senão usa o padrão do mapa */}
                      {doc.tipo?.descricao || visualStyle.labelDefault}
                    </p>
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-orange-600 transition-colors truncate">
                      {doc.nome}
                    </h3>

                    <div className="flex flex-col gap-1 mt-3">
                      {doc.extra_info && (
                        <span className="text-sm text-gray-500 flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mr-2"></span>
                          {doc.extra_info}
                        </span>
                      )}
                      <span className="text-xs text-gray-400 flex items-center">
                        <Calendar size={12} className="mr-1.5" />
                        Cadastrado em: {dataFormatada}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-xs text-gray-400 font-mono">
                    ID: {doc.id}
                  </span>
                  <span className="text-xs font-medium text-blue-600 group-hover:underline">
                    Abrir Documento
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* MODAL */}
      {modalOpen && selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
            onClick={handleCloseModal}
          ></div>

          <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
            {/* Modal Header com lógica visual dinâmica */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-3">
                {(() => {
                  const style = STYLE_MAP[selectedDoc.tipo_id] || DEFAULT_STYLE;
                  const Icon = style.icon;
                  return <Icon className={style.color} size={24} />;
                })()}
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {selectedDoc.nome}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {selectedDoc.tipo?.descricao ||
                      STYLE_MAP[selectedDoc.tipo_id]?.labelDefault}
                  </p>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 bg-gray-100 p-8 flex flex-col items-center justify-center min-h-100">
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center max-w-md w-full">
                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  {(() => {
                    const style =
                      STYLE_MAP[selectedDoc.tipo_id] || DEFAULT_STYLE;
                    const Icon = style.icon;
                    return <Icon size={32} />;
                  })()}
                </div>
                <h4 className="text-gray-800 font-semibold mb-2">
                  Visualização Indisponível (Mock)
                </h4>
                <p className="text-gray-500 text-sm mb-6">
                  URL do arquivo: <br />
                  <code className="text-xs bg-gray-100 p-1 rounded text-orange-600">
                    {selectedDoc.url}
                  </code>
                </p>

                <button className="w-full flex items-center justify-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white py-2.5 rounded-lg transition-all font-medium">
                  <Download size={18} />
                  <span>Baixar Agora</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
