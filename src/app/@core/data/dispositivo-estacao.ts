import { Observable } from "rxjs"
import { FilterInput, SchemaInterface, SortOperationKind } from "../api/generic-graphql"
import { CameraDispositivo } from "./dispositivo-camera"
import { RecepcaoReparticao, RecepcaoReparticaoFilter } from "./reparticao-recepcao"


export interface EstacaoDispositivo{
    id?: number
    siteId?: number
    nome: string
    tipo?: number
    cameraVeiculoId?: number
    cameraPessoaId?: number
    recepcaoId: number
    recepcao?: RecepcaoReparticao
    redeIP?: string
    impressora?: string
    observacao?: string
    status?: boolean
    cameraPessoa?: CameraDispositivo
    cameraVeiculo?: CameraDispositivo
}

export interface EstacaoDispositivoSort{
    id?: SortOperationKind
    siteId?: SortOperationKind
    nome?: SortOperationKind
    tipo?: SortOperationKind
    cameraVeiculoId?: SortOperationKind
    cameraPessoaId?: SortOperationKind
    recepcaoId?: SortOperationKind
    redeIp?: SortOperationKind
    impressora?: SortOperationKind
    observacao?: SortOperationKind
    status?: SortOperationKind
}

export interface EstacaoDispositivoFilter{
    id?: FilterInput
    siteId?: FilterInput
    nome?: FilterInput
    tipo?: FilterInput
    cameraVeiculoIp?: FilterInput
    cameraPessoaIp?: FilterInput
    recepcao?: RecepcaoReparticaoFilter
    redeIp?: FilterInput
    impressora?: FilterInput
    observacao?: FilterInput
    status?: FilterInput
    or?: [{recepcao: {id: FilterInput}},
          {tipo: FilterInput, siteId: FilterInput}]
}

export interface EstacaoDispositivoSchema extends SchemaInterface {
    nodes: EstacaoDispositivo[]
}

export interface create_EstacaoDispositivo { data: {dispositivoEstacao_Inserir: SchemaInterface }}
export interface read_EstacaoDispositivo   { dispositivoEstacao: EstacaoDispositivoSchema }
export interface update_EstacaoDispositivo { data: {dispositivoEstacao_Alterar: SchemaInterface }}
export interface delete_EstacaoDispositivo { data: {dispositivoEstacao_Excluir: SchemaInterface }}


export abstract class EstacaoDispositivoData {
    abstract createEstacaoDispositivo(site: EstacaoDispositivo): Observable<create_EstacaoDispositivo>;
    abstract readEstacaoDispositivo(order?: EstacaoDispositivoSort, where?: EstacaoDispositivoFilter): Observable<read_EstacaoDispositivo>;
    abstract updateEstacaoDispositivo(site: EstacaoDispositivo): Observable<update_EstacaoDispositivo>;
    abstract deleteEstacaoDispositivo(id: number): Observable<delete_EstacaoDispositivo>;

}