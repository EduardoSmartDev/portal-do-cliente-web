"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  User,
  FileText,
  Wrench,
  DollarSign,
  FileSpreadsheet,
  Calendar,
  BookOpen,
  UserPlus,
  Home,
  Leaf,
  Lightbulb,
  Package,
  Clock,
  TrendingUp,
  Shield,
  Lock,
} from "lucide-react";
import { UserSession } from "@/lib/Types";
import { HomePageList } from "./utils/Types";

/**
 * ✅ IMPORTANTE:
 * Para a animação "shimmer" funcionar, adicione no seu CSS global (ex.: src/app/globals.css):
 *
 * @keyframes shimmer {
 *   0% { transform: translateX(-60%); }
 *   100% { transform: translateX(260%); }
 * }
 */

interface HomePageContentProps {
  user: UserSession;
}

export default function HomePageContent({ user }: HomePageContentProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const menuItems: HomePageList[] = useMemo(
    () => [
      {
        id: 1,
        title: "Meus Dados",
        description:
          "Atualize suas informações pessoais, endereço e preferências de contato",
        icon: User,
        color: "bg-gradient-to-br from-gray-600 to-gray-700",
        link: "/meus-dados",
        tags: ["perfil", "dados", "contato", "limite de crédito"],
        admin: false,
        unlocked: true,
      },
      {
        id: 2,
        title: "Orçamentos",
        description: "Visualize e aprove orçamentos digitalmente",
        icon: FileText,
        color: "bg-gradient-to-br from-orange-500 to-orange-600",
        link: "/orcamentos",
        tags: ["orçamento", "aprovação", "proposta", "valores"],
        admin: false,
        unlocked: true,
      },
      {
        id: 3,
        title: "Acompanhamento do Projeto",
        description: "Veja a evolução do seu projeto em tempo real",
        icon: TrendingUp,
        color: "bg-gradient-to-br from-gray-500 to-gray-600",
        link: "/projeto",
        tags: ["timeline", "produção", "status", "etapas"],
        admin: false,
        unlocked: true,
      },
      {
        id: 4,
        title: "SAC - Atendimento",
        description: "Abra chamados e acompanhe o suporte técnico",
        icon: Wrench,
        color: "bg-orange-500",
        link: "/sac",
        tags: ["suporte", "chamados", "atendimento", "problemas"],
        admin: false,
        unlocked: true,
      },
      {
        id: 5,
        title: "Financeiro",
        description: "Consulte duplicatas, boletos e extratos",
        icon: DollarSign,
        color: "bg-emerald-500",
        link: "/financeiro",
        tags: ["boletos", "pagamentos", "duplicatas", "pix"],
        admin: false,
        unlocked: false,
      },
      {
        id: 6,
        title: "Documentos",
        description: "Acesse contratos, plantas, ART e arquivos do projeto",
        icon: FileSpreadsheet,
        color: "bg-indigo-500",
        link: "/documentos",
        tags: ["contrato", "plantas", "art", "memorial"],
        admin: false,
        unlocked: false,
      },
      {
        id: 7,
        title: "Linha do Tempo",
        description: "Histórico completo de todas as interações",
        icon: Clock,
        color: "bg-pink-500",
        link: "/timeline",
        tags: ["histórico", "feed", "atividades", "interações"],
        admin: false,
        unlocked: true,
      },

      // 🔒 Em construção (exemplos)
      {
        id: 8,
        title: "Assinaturas Digitais",
        description: "Assine documentos eletronicamente com Clicksign",
        icon: FileText,
        color: "bg-red-500",
        link: "/assinaturas",
        tags: ["assinatura", "clicksign", "documentos"],
        admin: false,
        unlocked: false,
      },
      {
        id: 9,
        title: "Agenda de Visitas",
        description: "Solicite e acompanhe visitas técnicas",
        icon: Calendar,
        color: "bg-cyan-500",
        link: "/visitas",
        tags: ["visita", "agendamento", "técnica", "assessoria"],
        admin: false,
        unlocked: false,
      },

      {
        id: 10,
        title: "Academia Smart",
        description: "Conteúdos educativos sobre construção e steel frame",
        icon: BookOpen,
        color: "bg-yellow-500",
        link: "/academia",
        tags: ["vídeos", "guias", "cases", "dicas"],
        admin: false,
        unlocked: false,
      },
      {
        id: 11,
        title: "Indicações",
        description: "Indique amigos e ganhe recompensas",
        icon: UserPlus,
        color: "bg-teal-500",
        link: "/indicacoes",
        tags: ["indicar", "recompensas", "programa", "amigos"],
        admin: false,
        unlocked: false,
      },
      {
        id: 12,
        title: "Minha Casa Digital",
        description: "Visualize detalhes técnicos e materiais da sua obra",
        icon: Home,
        color: "bg-violet-500",
        link: "/casa-digital",
        tags: ["materiais", "aço", "plantas 3d", "qr code"],
        admin: false,
        unlocked: true,
      },
      {
        id: 13,
        title: "Memorial de Materiais",
        description: "Lista completa de materiais utilizados no projeto",
        icon: Package,
        color: "bg-slate-500",
        link: "/memorial-materiais",
        tags: ["materiais", "lista", "especificações"],
        admin: false,
        unlocked: false,
      },
      {
        id: 14,
        title: "Sustentabilidade",
        description: "Acompanhe o impacto sustentável do seu projeto",
        icon: Leaf,
        color: "bg-lime-500",
        link: "/sustentabilidade",
        tags: ["sustentômetro", "economia", "verde", "impacto"],
        admin: false,
        unlocked: false,
      },
      {
        id: 15,
        title: "Dicas Smart",
        description: "Sugestões personalizadas para complementar seu projeto",
        icon: Lightbulb,
        color: "bg-amber-500",
        link: "/dicas",
        tags: ["upsell", "sugestões", "esquadrias", "complementos"],
        admin: false,
        unlocked: false,
      },

      // ADMIN
      {
        id: 16,
        title: "Administração",
        description: "Área exclusiva para administradores do sistema",
        icon: Shield,
        color: "bg-black",
        link: "/admin",
        tags: ["admin", "gestão", "sistema", "controle"],
        admin: true,
        unlocked: true,
      },
    ],
    []
  );

  const adminItems = useMemo(() => menuItems.filter((i) => i.admin), [menuItems]);
  const userItems = useMemo(() => menuItems.filter((i) => !i.admin), [menuItems]);

  const matchesSearch = (item: HomePageList) => {
    const s = searchTerm.toLowerCase();
    return (
      item.title.toLowerCase().includes(s) ||
      item.description.toLowerCase().includes(s) ||
      item.tags.some((tag) => tag.toLowerCase().includes(s))
    );
  };

  const filteredUserItems = userItems.filter(matchesSearch);
  const filteredAdminItems = user.admin ? adminItems.filter(matchesSearch) : [];

  const handleLockedClick = (title: string) => {
    toast(`${title} está em construção`, {
      icon: "🚧",
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-orange-50">
      {/* Header */}
      <header className="bg-linear-to-r from-gray-700 to-gray-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="bg-white p-2 rounded-lg">
                <div className="flex flex-col space-y-1">
                  <div className="h-2 w-16 bg-gray-500"></div>
                  <div className="h-2 w-16 bg-orange-500"></div>
                  <div className="h-2 w-16 bg-gray-600"></div>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Portal do Cliente</h1>
                <p className="mt-1 text-sm text-orange-300">
                  Espaço Smart - Construção a Seco
                </p>
              </div>
            </div>

            {/* Usuário */}
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-white">
                  Bem-vindo(a)! {user.nome}
                </p>
                {user.admin && (
                  <span className="inline-flex mt-1 items-center gap-1 rounded-full bg-orange-500/20 px-2 py-0.5 text-[11px] font-semibold text-orange-200">
                    <Shield className="h-3.5 w-3.5" />
                    Admin
                  </span>
                )}
              </div>

              <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold shadow-lg overflow-hidden">
                {user.foto ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/clientes/${user.foto}`}
                    width={40}
                    height={40}
                    alt="Foto do usuário"
                    className="h-10 w-10 object-cover"
                  />
                ) : (
                  user.nome.charAt(0).toUpperCase()
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar funcionalidade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
          />
          <svg
            className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Admin */}
      {user.admin && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          <div className="mb-2">
            <h2 className="text-sm font-semibold text-gray-700">Área Administrativa</h2>
            <p className="text-xs text-gray-500">Gestão geral do sistema</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {filteredAdminItems.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                onLockedClick={() => handleLockedClick(item.title)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Usuário */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        {user.admin && (
          <div className="mb-2">
            <h2 className="text-sm font-semibold text-gray-700">Funcionalidades</h2>
            <p className="text-xs text-gray-500">Acesso do portal</p>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {filteredUserItems.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              onLockedClick={() => handleLockedClick(item.title)}
            />
          ))}
        </div>

        {filteredUserItems.length === 0 && (!user.admin || filteredAdminItems.length === 0) && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">Nenhuma funcionalidade encontrada.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-linear-to-r from-gray-700 to-gray-600 border-t border-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <p className="text-center text-xs text-gray-200">
            © 2024 Espaço Smart - Tudo para Construção a Seco. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ======================
   MenuCard (locked + toast)
====================== */

function MenuCard({
  item,
  onLockedClick,
}: {
  item: HomePageList;
  onLockedClick: () => void;
}) {
  const IconComponent = item.icon as React.ComponentType<{ className?: string }>;
  const locked = item.unlocked === false;

  return (
    <a
      href={locked ? undefined : item.link}
      onClick={(e) => {
        if (locked) {
          e.preventDefault();
          onLockedClick();
        }
      }}
      aria-disabled={locked}
      className={[
        "group relative rounded-lg border bg-white p-4 text-center",
        "flex flex-col items-center justify-start gap-2",
        "min-h-42.5 transition-all duration-300",
        locked
          ? "cursor-not-allowed border-gray-200"
          : "shadow-sm hover:shadow-md hover:border-orange-400",
      ].join(" ")}
    >
      {/* Shimmer atrás */}
      {locked && (
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg">
          <span className="absolute -left-1/2 top-0 h-full w-1/2 bg-linear-to-r from-transparent via-orange-200/35 to-transparent animate-[shimmer_1.8s_infinite] opacity-80" />
          <span className="absolute inset-0 bg-gray-50/30" />
        </span>
      )}

      {/* Badge por cima */}
      {locked && (
        <span className="absolute right-3 top-3 z-20 inline-flex items-center gap-1 rounded-full border border-orange-200 bg-orange-50 px-2 py-0.5 text-[11px] font-semibold text-orange-700">
          <Lock className="h-3.5 w-3.5" />
          Em construção
        </span>
      )}

      <div className="relative z-10 flex flex-col items-center justify-start gap-2 pt-6 w-full">
        <div
          className={[
            `${item.color} rounded-lg p-2.5 transition-transform duration-300`,
            locked ? "scale-100 grayscale-20 opacity-90" : "group-hover:scale-110",
          ].join(" ")}
        >
          <IconComponent className="h-5 w-5 text-white" />
        </div>

        <h3
          className={[
            "mt-1 text-xs font-semibold line-clamp-2",
            locked ? "text-gray-800" : "text-gray-900 group-hover:text-orange-600",
          ].join(" ")}
        >
          {item.title}
        </h3>

        <p
          className={[
            "text-xs line-clamp-3",
            locked ? "text-gray-500" : "text-gray-500 group-hover:text-gray-700",
          ].join(" ")}
        >
          {item.description}
        </p>

        {locked && (
          <p className="mt-1 text-[11px] text-gray-500">
            Clique para ver aviso.
          </p>
        )}
      </div>
    </a>
  );
}
