import { Observable } from 'rxjs';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';
import { CameraDispositivo } from './dispositivo-camera';

export interface BloqueiosDispositivo {
    bloqueioId?: number
    bloqueio?: BloqueioDispositivo
}

export interface BloqueioCamera {
    cameraId?: number
    camera?: CameraDispositivo
}

export interface BloqueioDispositivo {
    id?: number
    localizacao?: string
    nome?: string
    transito?: number
    areaId?: number
    elevadorTerminalNumero?: number
    elevadorTerminalSigla?: string
    observacao?: string
    cameras?: BloqueioCamera[] 
}
export interface BloqueioDispositivoSort {      // Order_By
    id?: SortOperationKind
    nome?: string
}

export interface BloqueioDispositivoFilter {    // Where
    id?: FilterInput
    nome?: FilterInput
    areaId?: FilterInput
    transito?: FilterInput
    observacao?: FilterInput
    localizacao?: FilterInput
}

export interface BloqueioDispositivoSchema extends SchemaInterface {
    nodes: BloqueioDispositivo[]
}

export interface create_BloqueioDispositivo { data: { dispositivoBloqueio_Inserir: SchemaInterface }}
export interface read_BloqueioDispositivo { dispositivoBloqueio: BloqueioDispositivoSchema }
export interface update_BloqueioDispositivo { data: { dispositivoBloqueio_Alterar: SchemaInterface }}
export interface delete_BloqueioDispositivo { data: { dispositivoBloqueio_Excluir: SchemaInterface }}
export abstract class BloqueioDispositivoData {
    abstract createBloqueioDispositivo(site: BloqueioDispositivo): Observable<create_BloqueioDispositivo>;
    abstract readBloqueioDispositivos(order?: BloqueioDispositivoSort, where?: BloqueioDispositivoFilter): Observable<read_BloqueioDispositivo>;
    abstract updateBloqueioDispositivo(site: BloqueioDispositivo): Observable<update_BloqueioDispositivo>;
    abstract deleteBloqueioDispositivo(id: number): Observable<delete_BloqueioDispositivo>;
}