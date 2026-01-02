import { Users } from "@/components/admin/utils/Types";

export interface Sac {
  id: number;
  user_id: number;
  user: Users;
  mensagem: string;
  tipo_sac_id: number;
  status_id: number;
  status_sac: StatusSac;
  tipo_sac: TipoSac;
  created_at: Date;
  updated_at: Date;
}

export interface StatusSac {
    id: number;
    descricao: string;
}

export interface TipoSac {
    id: number;
    descricao: string;
}


