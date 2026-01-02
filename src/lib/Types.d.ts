export interface UserSession{
    foto: string;
    id: number;
    email: string;
    nome: string;
    admin: boolean;
}

export interface Users{
    id: number;
    nome: string;
    email: string;
    admin: boolean;
    celular?: string | null;
    last_login?: string | null;
    admin: boolean;
}