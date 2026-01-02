// src/components/admin/utils/types.ts
export type AdminView = "usuarios" | "obras" | "sac" | "projetos" | "documentos";


export interface Obra {
  id: number;
  nome: string;
  clienteNome: string;
  status: string;
  updatedAt?: string;
}

export interface SacTicket {
  id: number;
  assunto: string;
  status: "aberto" | "em_andamento" | "fechado";
  clienteNome: string;
  createdAt?: string;
}

export interface Projeto {
  id: number;
  nome: string;
  clienteNome: string;
  etapa: string;
  updatedAt?: string;
}

export interface Documento {
  id: number;
  nome: string;
  tipo: string;
  userId: number;
  userNome: string;
  createdAt?: string;
}

export interface AdminDashboardProps {
  user: Users; // admin logado (opcional)
  usuarios: Users[];
  obras: Obra[];
  sacAbertos: SacTicket[];
  projetos: Projeto[];
  documentos: Documento[];
  initialView?: AdminView;
}
