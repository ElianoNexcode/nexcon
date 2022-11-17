import { Observable } from 'rxjs';
import { Item } from 'src/app/@theme/layouts/treeview/service/treeview';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';
import { AreaReparticao } from './reparticao-area';
import { Site, SiteFilter, SiteSort } from './reparticao-site';
export interface SetorReparticao {
    id?: number
    siteId?: number
    site?: Site
    nome?: string
    observacao?: string
    areas?: AreaReparticao[]
}
export interface SetorReparticaoSort {
    id?: SortOperationKind
    site?: SiteSort
    siteId?: SortOperationKind
    nome?: SortOperationKind
    observacao?: SortOperationKind
    areas?: SortOperationKind
}
export interface SetorReparticaoFilter {
    id?: FilterInput
    siteId?: FilterInput
    site?: SiteFilter
    nome?: FilterInput
    areas?: AreaReparticao
    observacao?: FilterInput
}
export interface SetorReparticaoSchema extends SchemaInterface {
    nodes: SetorReparticao[]
    totalCount: number
}

export interface create_SetorReparticao { data: { reparticaoSetor_Inserir: SchemaInterface } }
export interface read_SetorReparticao { reparticaoSetor: SetorReparticaoSchema }
export interface update_SetorReparticao { data: { reparticaoSetor_Alterar: SchemaInterface } }
export interface delete_SetorReparticao { data: { reparticaoSetor_Excluir: SchemaInterface } }
export abstract class SetorReparticaoData {
    abstract createSetorReparticao(site: SetorReparticao): Observable<create_SetorReparticao>;
    abstract readSetorReparticao(order?: SetorReparticaoSort, where?: SetorReparticaoFilter): Observable<read_SetorReparticao>;
    abstract updateSetorReparticao(site: SetorReparticao): Observable<update_SetorReparticao>;
    abstract deleteSetorReparticao(id: number): Observable<delete_SetorReparticao>;
    abstract getSetorReparticaoTreeView(filter: SetorReparticaoFilter, showArea: boolean): Item[];
}