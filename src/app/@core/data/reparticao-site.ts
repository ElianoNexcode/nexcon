import { Observable } from 'rxjs';
import { ListViewGrid } from 'src/app/@theme/components';
import { FilterInput, PageInfo, SchemaInterface, SortOperationKind } from '../api/generic-graphql';
import { AreaReparticao, AreaReparticaoFilter } from './reparticao-area';
import { SetorReparticao } from './reparticao-setor';

export interface Supervisao {
    tipo: number
    pessoaId: number
    pessoaInterna?: {
        id: number
        nome: string
    }
}
export interface Site {
    id?: number
    nome: string
    areas?: AreaReparticao
    nivelAcessoRotativo?: number
    supervisao?: Supervisao[]
    setores?: SetorReparticao[]
    observacao: string
}

export interface SiteSort {
    id?: SortOperationKind
    nome?: SortOperationKind
    nivelAcessoRotativo?: SortOperationKind
    observacao?: SortOperationKind
}

export interface SiteFilter {
    id?: FilterInput
    nome?: FilterInput
    areas?: AreaReparticaoFilter
    nivelAcessoRotativo?: FilterInput
    observacao?: FilterInput
    OR?: [{id: FilterInput}]
}

export interface SiteGrupoSchema extends SchemaInterface {
    nodes: Site[]
    totalCount: number
    pageInfo: PageInfo
}

export interface create_Site { data: { reparticaoSite_Inserir: SchemaInterface }}
export interface read_Site   { reparticaoSite: SiteGrupoSchema }
export interface update_Site { data: { reparticaoSite_Alterar: SchemaInterface }}
export interface delete_Site { data: { reparticaoSite_Excluir: SchemaInterface }}

export abstract class SiteData {
    orderBy: SiteSort;
    where: SiteFilter;

    abstract createSite(site: Site): Observable<create_Site>;
    abstract read(isListView?: boolean, isTreeView?: boolean): Observable<read_Site>;
    abstract updateSite(site: Site): Observable<update_Site>;
    abstract deleteSite(id: number): Observable<delete_Site>;
}