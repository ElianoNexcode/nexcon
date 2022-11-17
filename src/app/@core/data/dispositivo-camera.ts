import { Observable } from 'rxjs';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';
import { BloqueioCamera, BloqueioDispositivo } from './dispositivo-bloqueio';
import { Site, SiteFilter, SiteSort } from './reparticao-site';

export interface CameraDispositivo {
    id?: number
    bloqueios?: BloqueioCamera[]
    fps: number
    integracao: number
    localizacao: string
    login: string
    nome: string
    observacao: string
    redeIP: string
    redePorta: number
    senha: string
    site?: Site
    siteId: number
    status: boolean
    url: string
}

export interface CameraDispositivoSort {      // Order_By
    id?: SortOperationKind
    fps?: SortOperationKind
    integracao?: SortOperationKind
    localizacao?: SortOperationKind
    login?: SortOperationKind
    nome?: SortOperationKind
    observacao?: SortOperationKind
    redeIp?: SortOperationKind
    redePorta?: SortOperationKind
    senha?: SortOperationKind
    siteId?: SortOperationKind
    site?: SiteSort
    status?: SortOperationKind
    url?: SortOperationKind
}

export interface CameraDispositivoFilter {    // Where
    id?: FilterInput
    siteId?: FilterInput
    fps_contains?: FilterInput
    integracao?: FilterInput
    localizacao?: FilterInput
    login?: FilterInput
    nome?: FilterInput
    observacao?: FilterInput
    redeIP?: FilterInput
    redePorta?: FilterInput
    senha?: FilterInput
    site?: SiteFilter
    status?: FilterInput
    url?: FilterInput
}

export interface CameraDispositivoSchema extends SchemaInterface {
    nodes: CameraDispositivo[]
}

export interface create_CameraDispositivo { data: { dispositivoCamera_Inserir: SchemaInterface }}
export interface read_CameraDispositivo { dispositivoCamera: CameraDispositivoSchema }
export interface update_CameraDispositivo { data: { dispositivoCamera_Alterar: SchemaInterface }}
export interface delete_CameraDispositivo { data: { dispositivoCamera_Excluir: SchemaInterface }}

export abstract class CameraDispositivoData {
    abstract createCameraDispositivo(site: CameraDispositivo): Observable<create_CameraDispositivo>;
    abstract readCameraDispositivos(order?: CameraDispositivoSort, where?: CameraDispositivoFilter): Observable<read_CameraDispositivo>;
    abstract updateCameraDispositivo(site: CameraDispositivo): Observable<update_CameraDispositivo>;
    abstract deleteCameraDispositivo(id: number): Observable<delete_CameraDispositivo>;
}