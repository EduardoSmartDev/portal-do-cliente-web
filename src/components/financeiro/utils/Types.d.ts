export interface Documento{
    id: number;
    tipo_id: number;
    user_id: number;
    nome:string;
    url: string;
    data_criacao: string;
    extra_info?: string;
    tipo: TipoDocumento;
}

export interface TipoDocumento{
    id?: string;
    descricao: string;
}