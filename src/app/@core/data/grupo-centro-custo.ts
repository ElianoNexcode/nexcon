import { Observable } from 'rxjs';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';

export interface CentroCustoGrupo {
    id?: number
    centroCusto: string
}

export interface CentroCustoGrupoSort {
    id?: SortOperationKind
    centroCusto?: SortOperationKind
}

export interface CentroCustoGrupoFilter {
    id?: FilterInput    
    centroCusto?: FilterInput
}

export interface CentroCustoGrupoSchema extends SchemaInterface {
    nodes: CentroCustoGrupo[]
}

export interface create_CentroCustoGrupo { data: { grupoCentroCusto_Inserir: SchemaInterface }}
export interface read_CentroCustoGrupo { grupoCentroCusto: CentroCustoGrupoSchema }
export interface update_CentroCustoGrupo { data: { grupoCentroCusto_Alterar: SchemaInterface }}
export interface delete_CentroCustoGrupo { data: { grupoCentroCusto_Excluir: SchemaInterface }}

export abstract class CentroCustoGrupoData {
    abstract createCentroCustoGrupo(centroCusto: CentroCustoGrupo): Observable<create_CentroCustoGrupo>;
    abstract readCentroCustoGrupos(order?: CentroCustoGrupoSort, where?: CentroCustoGrupoFilter): Observable<read_CentroCustoGrupo>;
    abstract updateCentroCustoGrupo(centroCusto: CentroCustoGrupo): Observable<update_CentroCustoGrupo>;
    abstract deleteCentroCustoGrupo(id: number): Observable<delete_CentroCustoGrupo>;
}