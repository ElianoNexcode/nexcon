import { Observable } from 'rxjs';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';

export interface EmergenciaGrupo {
    id?: number
    emergenciaGrupo: string
}

export interface EmergenciaGrupoSort {
    id?: SortOperationKind
    emergenciaGrupo?: SortOperationKind
}

export interface EmergenciaGrupoFilter {
    id?: FilterInput
    emergenciaGrupo?: FilterInput
}

export interface EmergenciaGrupoSchema extends SchemaInterface {
    nodes: EmergenciaGrupo[]
}

export interface create_EmergenciaGrupo { data: { grupoEmergencia_Inserir: SchemaInterface }}
export interface read_EmergenciaGrupo { grupoEmergencia: EmergenciaGrupoSchema }
export interface update_EmergenciaGrupo { data: { grupoEmergencia_Alterar: SchemaInterface }}
export interface delete_EmergenciaGrupo { data: { grupoEmergencia_Excluir: SchemaInterface }}

export abstract class EmergenciaGrupoData {
    abstract createEmergenciaGrupo(site: EmergenciaGrupo): Observable<create_EmergenciaGrupo>;
    abstract readEmergenciaGrupos(order?: EmergenciaGrupoSort, where?: EmergenciaGrupoFilter): Observable<read_EmergenciaGrupo>;
    abstract updateEmergenciaGrupo(site: EmergenciaGrupo): Observable<update_EmergenciaGrupo>;
    abstract deleteEmergenciaGrupo(id: number): Observable<delete_EmergenciaGrupo>;
}