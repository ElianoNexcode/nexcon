import { Observable } from 'rxjs';
import { Item } from 'src/app/@theme/layouts/treeview/service/treeview';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';
import { Site, SiteFilter, SiteSort } from './reparticao-site';

export interface NivelOperacaoEx {
    siteId: number
    site?: Site
}

export interface NivelOperacao {
    id?: number
    nome: string
    observacao: string
    privilegios: string
    siteId?: number
    site?: Site
    nivelOperacaoEx?: Array<number>
}

export interface NivelOperacaoQuery {
    id?: number
    nome: string
    observacao: string
    privilegios: string
    siteId?: number
    site?: Site
    nivelOperacaoEx?: Array<NivelOperacaoEx>
}

export interface NivelOperacaoSort {
    id?: SortOperationKind
    nome?: SortOperationKind
    observacao?: SortOperationKind
    privilegios?: SortOperationKind
    siteId?: SortOperationKind
    site?: SiteSort
}

export interface NivelOperacaoFilter {
    id?: FilterInput
    nome?: FilterInput
    site?: SiteFilter
    observacao?: FilterInput
    privilegios?: FilterInput
}

export interface NivelOperacaoGrupoSchema extends SchemaInterface {
    totalCount: number
    nodes: NivelOperacaoQuery[]
}

export interface Operador {
    id: number
    nome: string
}

export interface create_NivelOperacao { data: { operadorNivelOperacao_Inserir: SchemaInterface }}
export interface read_NivelOperacao { operadorNivelOperacao: NivelOperacaoGrupoSchema }
export interface update_NivelOperacao { data: { operadorNivelOperacao_Alterar: SchemaInterface }}
export interface delete_NivelOperacao { data: { operadorNivelOperacao_Excluir: SchemaInterface }}

export abstract class NivelOperacaoData {
    abstract createNivelOperacao(NivelOperacao: NivelOperacao): Observable<create_NivelOperacao>;
    abstract readNivelOperacao(order?: NivelOperacaoSort, where?: NivelOperacaoFilter): Observable<read_NivelOperacao>;
    abstract updateNivelOperacao(NivelOperacao: NivelOperacao): Observable<update_NivelOperacao>;
    abstract deleteNivelOperacao(id: number): Observable<delete_NivelOperacao>;
    abstract getNivelOperacaoTreeView(filter: NivelOperacaoFilter): Item[];

    abstract getPrivilegios(): string;
    abstract setPrivilegio(operPriv: string, privPos: number, privOper: string): string;

    abstract checkAcessRights(recurso: string, funcao: number): boolean;
    abstract checkNivelOperacao(recurso: string, funcao: number, nivel: string): boolean;
    abstract nivelPos(itemId: string, dec?: boolean): any;

    abstract getOperadorNome(): Operador;
}