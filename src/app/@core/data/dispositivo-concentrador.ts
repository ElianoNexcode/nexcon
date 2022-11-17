import { Observable } from 'rxjs';
import { Item } from 'src/app/@theme/layouts/treeview/service/treeview';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';
import { Site, SiteFilter, SiteSort } from './reparticao-site';

export interface ConcentradorDispositivo {
    id?: number
    start?: Date
    check?: Date
    localizacao: string
    nome: string
    observacao: string
    redeIP: string
    redePorta1: number
    redePorta2: number
    siteId?: number
    site?: Site
    status: boolean
}

export interface ConcentradorDispositivoSort {
    id?: SortOperationKind
    dataHoraAtual?: SortOperationKind
    dataHoraInicio?: SortOperationKind
    localizacao?: SortOperationKind
    nome?: SortOperationKind
    observacao?: SortOperationKind
    redeIP?: SortOperationKind
    redePorta1?: SortOperationKind
    redePorta2?: SortOperationKind
    site?: SiteSort
    status?: SortOperationKind
}

export interface ConcentradorDispositivoFilter {
    id?: FilterInput
    siteId?: FilterInput
    localizacao?: FilterInput
    nome?: FilterInput
    versao?: FilterInput
    observacao?: FilterInput
    redeIP?: FilterInput
    redePorta1?: FilterInput
    redePorta2?: FilterInput 
    site?: SiteFilter
    status?: FilterInput
}

export interface ConcentradorDispositivoSchema extends SchemaInterface {
    nodes: ConcentradorDispositivo[]
}

export interface create_ConcentradorDispositivo { data: { dispositivoConcentrador_Inserir: SchemaInterface }}
export interface read_ConcentradorDispositivo { dispositivoConcentrador: ConcentradorDispositivoSchema }
export interface update_ConcentradorDispositivo { data: { dispositivoConcentrador_Alterar: SchemaInterface }}
export interface delete_ConcentradorDispositivo { data: { dispositivoConcentrador_Excluir: SchemaInterface }}

export abstract class ConcentradorDispositivoData {
    abstract createConcentradorDispositivo(site: ConcentradorDispositivo): Observable<create_ConcentradorDispositivo>;
    abstract readConcentradorDispositivos(order?: ConcentradorDispositivoSort, where?: ConcentradorDispositivoFilter): Observable<read_ConcentradorDispositivo>;
    abstract updateConcentradorDispositivo(site: ConcentradorDispositivo): Observable<update_ConcentradorDispositivo>;
    abstract deleteConcentradorDispositivo(id: number): Observable<delete_ConcentradorDispositivo>;
    abstract getConcentradorDispositivoTreeView(filter: ConcentradorDispositivoFilter): Item[];
}