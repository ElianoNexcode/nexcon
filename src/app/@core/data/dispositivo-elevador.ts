import { Observable } from 'rxjs';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';
import { CameraDispositivo } from './dispositivo-camera';
import { Site, SiteFilter } from './reparticao-site';


export interface ElevadoresDispositivo {
    elevadorId?: number
    elevadorAndar?: string
    elevador?: ElevadorDispositivo
}

export interface ElevadorCamera {
cameraId?: number
camera?: CameraDispositivo
}


export interface ElevadorDispositivo {
    id?: number
    nome?: string
    localizacao?: string
    observacao?: string
    site?: Site
    areaId?: number
    cameras?: ElevadorCamera[]
    andar01Nome?: string
    andar01Restrito?: boolean
    andar02Nome?: string
    andar02Restrito?: boolean
    andar03Nome?: string
    andar03Restrito?: boolean
    andar04Nome?: string
    andar04Restrito?: boolean
    andar05Nome?: string
    andar05Restrito?: boolean
    andar06Nome?: string
    andar06Restrito?: boolean
    andar07Nome?: string
    andar07Restrito?: boolean
    andar08Nome?: string
    andar08Restrito?: boolean
    andar09Nome?: string
    andar09Restrito?: boolean
    andar10Nome?: string
    andar10Restrito?: boolean
    andar11Nome?: string
    andar11Restrito?: boolean
    andar12Nome?: string
    andar12Restrito?: boolean
    andar13Nome?: string
    andar13Restrito?: boolean
    andar14Nome?: string
    andar14Restrito?: boolean
    andar15Nome?: string
    andar15Restrito?: boolean
    andar16Nome?: string
    andar16Restrito?: boolean
    andar17Nome?: string
    andar17Restrito?: boolean
    andar18Nome?: string
    andar18Restrito?: boolean
    andar19Nome?: string
    andar19Restrito?: boolean
    andar20Nome?: string
    andar20Restrito?: boolean
    andar21Nome?: string
    andar21Restrito?: boolean
    andar22Nome?: string
    andar22Restrito?: boolean
    andar23Nome?: string
    andar23Restrito?: boolean
    andar24Nome?: string
    andar24Restrito?: boolean
    andar25Nome?: string
    andar25Restrito?: boolean
    andar26Nome?: string
    andar26Restrito?: boolean
    andar27Nome?: string
    andar27Restrito?: boolean
    andar28Nome?: string
    andar28Restrito?: boolean
    andar29Nome?: string
    andar29Restrito?: boolean
    andar30Nome?: string
    andar30Restrito?: boolean
    andar31Nome?: string
    andar31Restrito?: boolean
    andar32Nome?: string
    andar32Restrito?: boolean
    andar33Nome?: string
    andar33Restrito?: boolean
    andar34Nome?: string
    andar34Restrito?: boolean
    andar35Nome?: string
    andar35Restrito?: boolean
    andar36Nome?: string
    andar36Restrito?: boolean
    andar37Nome?: string
    andar37Restrito?: boolean
    andar38Nome?: string
    andar38Restrito?: boolean
    andar39Nome?: string
    andar39Restrito?: boolean
    andar40Nome?: string
    andar40Restrito?: boolean
    andar41Nome?: string
    andar41Restrito?: boolean
    andar42Nome?: string
    andar42Restrito?: boolean
    andar43Nome?: string
    andar43Restrito?: boolean
    andar44Nome?: string
    andar44Restrito?: boolean
    andar45Nome?: string
    andar45Restrito?: boolean
    andar46Nome?: string
    andar46Restrito?: boolean
    andar47Nome?: string
    andar47Restrito?: boolean
    andar48Nome?: string
    andar48Restrito?: boolean
}

export interface ElevadorDispositivoSort {
    id?: SortOperationKind
    localizacao?: SortOperationKind
    nome?: SortOperationKind
    observacao?: SortOperationKind
    andar01Nome?: SortOperationKind
    andar01Restrito?: SortOperationKind
    andar02Nome?: SortOperationKind
    andar02Restrito?: SortOperationKind
    andar03Nome?: SortOperationKind
    andar03Restrito?: SortOperationKind
    andar04Nome?: SortOperationKind
    andar04Restrito?: SortOperationKind
    andar05Nome?: SortOperationKind
    andar05Restrito?: SortOperationKind
    andar06Nome?: SortOperationKind
    andar06Restrito?: SortOperationKind
    andar07Nome?: SortOperationKind
    andar07Restrito?: SortOperationKind
    andar08Nome?: SortOperationKind
    andar08Restrito?: SortOperationKind
    andar09Nome?: SortOperationKind
    andar09Restrito?: SortOperationKind
    andar10Nome?: SortOperationKind
    andar10Restrito?: SortOperationKind
    andar11Nome?: SortOperationKind
    andar11Restrito?: SortOperationKind
    andar12Nome?: SortOperationKind
    andar12Restrito?: SortOperationKind
    andar13Nome?: SortOperationKind
    andar13Restrito?: SortOperationKind
    andar14Nome?: SortOperationKind
    andar14Restrito?: SortOperationKind
    andar15Nome?: SortOperationKind
    andar15Restrito?: SortOperationKind
    andar16Nome?: SortOperationKind
    andar16Restrito?: SortOperationKind
    andar17Nome?: SortOperationKind
    andar17Restrito?: SortOperationKind
    andar18Nome?: SortOperationKind
    andar18Restrito?: SortOperationKind
    andar19Nome?: SortOperationKind
    andar19Restrito?: SortOperationKind
    andar20Nome?: SortOperationKind
    andar20Restrito?: SortOperationKind
    andar21Nome?: SortOperationKind
    andar21Restrito?: SortOperationKind
    andar22Nome?: SortOperationKind
    andar22Restrito?: SortOperationKind
    andar23Nome?: SortOperationKind
    andar23Restrito?: SortOperationKind
    andar24Nome?: SortOperationKind
    andar24Restrito?: SortOperationKind
    andar25Nome?: SortOperationKind
    andar25Restrito?: SortOperationKind
    andar26Nome?: SortOperationKind
    andar26Restrito?: SortOperationKind
    andar27Nome?: SortOperationKind
    andar27Restrito?: SortOperationKind
    andar28Nome?: SortOperationKind
    andar28Restrito?: SortOperationKind
    andar29Nome?: SortOperationKind
    andar29Restrito?: SortOperationKind
    andar30Nome?: SortOperationKind
    andar30Restrito?: SortOperationKind
    andar31Nome?: SortOperationKind
    andar31Restrito?: SortOperationKind
    andar32Nome?: SortOperationKind
    andar32Restrito?: SortOperationKind
    andar33Nome?: SortOperationKind
    andar33Restrito?: SortOperationKind
    andar34Nome?: SortOperationKind
    andar34Restrito?: SortOperationKind
    andar35Nome?: SortOperationKind
    andar35Restrito?: SortOperationKind
    andar36Nome?: SortOperationKind
    andar36Restrito?: SortOperationKind
    andar37Nome?: SortOperationKind
    andar37Restrito?: SortOperationKind
    andar38Nome?: SortOperationKind
    andar38Restrito?: SortOperationKind
    andar39Nome?: SortOperationKind
    andar39Restrito?: SortOperationKind
    andar40Nome?: SortOperationKind
    andar40Restrito?: SortOperationKind
    andar41Nome?: SortOperationKind
    andar41Restrito?: SortOperationKind
    andar42Nome?: SortOperationKind
    andar42Restrito?: SortOperationKind
    andar43Nome?: SortOperationKind
    andar43Restrito?: SortOperationKind
    andar44Nome?: SortOperationKind
    andar44Restrito?: SortOperationKind
    andar45Nome?: SortOperationKind
    andar45Restrito?: SortOperationKind
    andar46Nome?: SortOperationKind
    andar46Restrito?: SortOperationKind
    andar47Nome?: SortOperationKind
    andar47Restrito?: SortOperationKind
    andar48Nome?: SortOperationKind
    andar48Restrito?: SortOperationKind
}

export interface ElevadorDispositivoFilter {
    id?: FilterInput
    site?: SiteFilter
    areaId?: FilterInput
    nome?: FilterInput
    localizacao?: FilterInput
    observacao?: FilterInput
    andar01Nome?: FilterInput
    andar01Restrito?: FilterInput
    andar02Nome?: FilterInput
    andar02Restrito?: FilterInput
    andar03Nome?: FilterInput
    andar03Restrito?: FilterInput
    andar04Nome?: FilterInput
    andar04Restrito?: FilterInput
    andar05Nome?: FilterInput
    andar05Restrito?: FilterInput
    andar06Nome?: FilterInput
    andar06Restrito?: FilterInput
    andar07Nome?: FilterInput
    andar07Restrito?: FilterInput
    andar08Nome?: FilterInput
    andar08Restrito?: FilterInput
    andar09Nome?: FilterInput
    andar09Restrito?: FilterInput
    andar10Nome?: FilterInput
    andar10Restrito?: FilterInput
    andar11Nome?: FilterInput
    andar11Restrito?: FilterInput
    andar12Nome?: FilterInput
    andar12Restrito?: FilterInput
    andar13Nome?: FilterInput
    andar13Restrito?: FilterInput
    andar14Nome?: FilterInput
    andar14Restrito?: FilterInput
    andar15Nome?: FilterInput
    andar15Restrito?: FilterInput
    andar16Nome?: FilterInput
    andar16Restrito?: FilterInput
    andar17Nome?: FilterInput
    andar17Restrito?: FilterInput
    andar18Nome?: FilterInput
    andar18Restrito?: FilterInput
    andar19Nome?: FilterInput
    andar19Restrito?: FilterInput
    andar20Nome?: FilterInput
    andar20Restrito?: FilterInput
    andar21Nome?: FilterInput
    andar21Restrito?: FilterInput
    andar22Nome?: FilterInput
    andar22Restrito?: FilterInput
    andar23Nome?: FilterInput
    andar23Restrito?: FilterInput
    andar24Nome?: FilterInput
    andar24Restrito?: FilterInput
    andar25Nome?: FilterInput
    andar25Restrito?: FilterInput
    andar26Nome?: FilterInput
    andar26Restrito?: FilterInput
    andar27Nome?: FilterInput
    andar27Restrito?: FilterInput
    andar28Nome?: FilterInput
    andar28Restrito?: FilterInput
    andar29Nome?: FilterInput
    andar29Restrito?: FilterInput
    andar30Nome?: FilterInput
    andar30Restrito?: FilterInput
    andar31Nome?: FilterInput
    andar31Restrito?: FilterInput
    andar32Nome?: FilterInput
    andar32Restrito?: FilterInput
    andar33Nome?: FilterInput
    andar33Restrito?: FilterInput
    andar34Nome?: FilterInput
    andar34Restrito?: FilterInput
    andar35Nome?: FilterInput
    andar35Restrito?: FilterInput
    andar36Nome?: FilterInput
    andar36Restrito?: FilterInput
    andar37Nome?: FilterInput
    andar37Restrito?: FilterInput
    andar38Nome?: FilterInput
    andar38Restrito?: FilterInput
    andar39Nome?: FilterInput
    andar39Restrito?: FilterInput
    andar40Nome?: FilterInput
    andar40Restrito?: FilterInput
    andar41Nome?: FilterInput
    andar41Restrito?: FilterInput
    andar42Nome?: FilterInput
    andar42Restrito?: FilterInput
    andar43Nome?: FilterInput
    andar43Restrito?: FilterInput
    andar44Nome?: FilterInput
    andar44Restrito?: FilterInput
    andar45Nome?: FilterInput
    andar45Restrito?: FilterInput
    andar46Nome?: FilterInput
    andar46Restrito?: FilterInput
    andar47Nome?: FilterInput
    andar47Restrito?: FilterInput
    andar48Nome?: FilterInput
    andar48Restrito?: FilterInput
}

export interface ElevadorDispositivoSchema extends SchemaInterface {
    nodes: ElevadorDispositivo[]
}

export interface create_ElevadorDispositivo { data: { dispositivoElevador_Inserir: SchemaInterface }}
export interface read_ElevadorDispositivo { dispositivoElevador: ElevadorDispositivoSchema }
export interface update_ElevadorDispositivo { data: { dispositivoElevador_Alterar: SchemaInterface }}
export interface delete_ElevadorDispositivo { data: { dispositivoElevador_Excluir: SchemaInterface }}

export abstract class ElevadorDispositivoData {
    abstract createElevadorDispositivo(site: ElevadorDispositivo): Observable<create_ElevadorDispositivo>;
    abstract readElevadorDispositivos(order?: ElevadorDispositivoSort, where?: ElevadorDispositivoFilter): Observable<read_ElevadorDispositivo>;
    abstract updateElevadorDispositivo(site: ElevadorDispositivo): Observable<update_ElevadorDispositivo>;
    abstract deleteElevadorDispositivo(id: number): Observable<delete_ElevadorDispositivo>;
}


