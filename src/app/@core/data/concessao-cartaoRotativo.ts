import { Observable } from 'rxjs';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';
import { IdentificacaoControleFilter } from './controle-identificacao';
import { IdentificacaoGrupoFilter } from './grupo-identificacao';

export interface CartaoRotativo {
    identificador?: number
    cartao: number
    siteId: number
    status: Boolean
    identificacao?: {
        pessoaNome?: string
        pessoaTipo?: number
    };   
}

export interface CartaoRotativoSort {
    identificador?: SortOperationKind
    cartao?: SortOperationKind
    siteId?: SortOperationKind
    status?: SortOperationKind
}

export interface CartaoRotativoFilter {
    identificador?: FilterInput
    identificacao?: IdentificacaoControleFilter
    cartao?: FilterInput
    siteId?: FilterInput
    status?: FilterInput
}

export interface CartaoRotativoSchema extends SchemaInterface {
    nodes: CartaoRotativo[]
}

export interface create_CartaoRotativo { data: { concessaoCartaoRotativo_Inserir: SchemaInterface }}
export interface read_CartaoRotativo { concessaoCartaoRotativo: CartaoRotativoSchema }
export interface update_CartaoRotativo { data: { concessaoCartaoRotativo_Alterar: SchemaInterface }}
export interface delete_CartaoRotativo { data: { concessaoCartaoRotativo_Excluir: SchemaInterface }}

export abstract class CartaoRotativoData {
    abstract createCartaoRotativo(cartao: CartaoRotativo): Observable<create_CartaoRotativo>;
    abstract readCartaoRotativo(order?: CartaoRotativoSort, where?: CartaoRotativoFilter): Observable<read_CartaoRotativo>;
    abstract updateCartaoRotativo(site: CartaoRotativo): Observable<update_CartaoRotativo>;
    abstract deleteCartaoRotativo(id: number): Observable<delete_CartaoRotativo>;
}