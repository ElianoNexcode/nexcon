import { Observable } from 'rxjs';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';
import { Site, SiteFilter, SiteSort } from './reparticao-site';

export interface TerminalDispositivo {
    id?: number
    localizacao: string
    login: string
    nome: string
    tipo: number
    redeIP: string
    redePorta: number
    senha: string
    siteId: number
    site?: Site
    observacao: string
    status: boolean
}

export interface TerminalDispositivoSort {
    id?: SortOperationKind
    localizacao?: SortOperationKind
    login?: SortOperationKind
    nome?: SortOperationKind
    observacao?: SortOperationKind
    redeIp?: SortOperationKind
    redePorta?: SortOperationKind
    senha?: SortOperationKind
    site?: SiteSort
    status?: SortOperationKind
    tipo?: SortOperationKind
}

export interface TerminalDispositivoFilter {
    id?: FilterInput
    siteId?: FilterInput
    site?: SiteFilter
    localizacao?: FilterInput
    login?: FilterInput
    nome?: FilterInput
    observacao?: FilterInput
    redeIP?: FilterInput
    redePorta?: FilterInput
    senha?: FilterInput
    status?: FilterInput
    tipo?: FilterInput
}

export interface TerminalDispositivoSchema extends SchemaInterface {
    nodes: TerminalDispositivo[]
}

export interface create_TerminalDispositivo { data: { dispositivoTerminal_Inserir: SchemaInterface }}
export interface read_TerminalDispositivo { dispositivoTerminal: TerminalDispositivoSchema }
export interface update_TerminalDispositivo { data: { dispositivoTerminal_Alterar: SchemaInterface }}
export interface delete_TerminalDispositivo { data: { dispositivoTerminal_Excluir: SchemaInterface }}

export abstract class TerminalDispositivoData {
    abstract createTerminalDispositivo(site: TerminalDispositivo): Observable<create_TerminalDispositivo>;
    abstract readTerminalDispositivos(order?: TerminalDispositivoSort, where?: TerminalDispositivoFilter): Observable<read_TerminalDispositivo>;
    abstract updateTerminalDispositivo(site: TerminalDispositivo): Observable<update_TerminalDispositivo>;
    abstract deleteTerminalDispositivo(id: number): Observable<delete_TerminalDispositivo>;
}