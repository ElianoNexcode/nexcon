import { Observable } from 'rxjs';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';

export interface TelefonesUteisComunicacao {
    id?: number
    siteId: number
    nome: string
    telefone1: string
    telefone2: string
    email: string
    observacao: string
}

export interface TelefonesUteisComunicacaoSort {
    id?: SortOperationKind
    siteId?: SortOperationKind
    nome?: SortOperationKind
    telefone1?: SortOperationKind
    telefone2?: SortOperationKind
    email?: SortOperationKind
    observacao?: SortOperationKind
}

export interface TelefonesUteisComunicacaoFilter {
    id?: FilterInput
    siteId?: FilterInput
    nome?: FilterInput
    telefone1?: FilterInput
    telefone2?: FilterInput
    email?: FilterInput
    observacao?: FilterInput
}

export interface TelefonesUteisComunicacaoSchema extends SchemaInterface {
    nodes: TelefonesUteisComunicacao[]
}

export interface create_TelefonesUteisComunicacao { data: { comunicacaoTelefonesUteis_Inserir: SchemaInterface }}
export interface read_TelefonesUteisComunicacao { comunicacaoTelefonesUteis: TelefonesUteisComunicacaoSchema }
export interface update_TelefonesUteisComunicacao { data: { comunicacaoTelefonesUteis_Alterar: SchemaInterface }}
export interface delete_TelefonesUteisComunicacao { data: { comunicacaoTelefonesUteis_Excluir: SchemaInterface }}

export abstract class TelefonesUteisComunicacaoData {
    abstract createTelefonesUteisComunicacao(site: TelefonesUteisComunicacao): Observable<create_TelefonesUteisComunicacao>;
    abstract readTelefonesUteisComunicacaos(order?: TelefonesUteisComunicacaoSort, where?: TelefonesUteisComunicacaoFilter, first?: number): Observable<read_TelefonesUteisComunicacao>;
    abstract updateTelefonesUteisComunicacao(site: TelefonesUteisComunicacao): Observable<update_TelefonesUteisComunicacao>;
    abstract deleteTelefonesUteisComunicacao(id: number): Observable<delete_TelefonesUteisComunicacao>;
}