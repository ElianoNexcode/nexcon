import { Observable } from 'rxjs';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';
import { VeiculoExternoUsuario } from './usuario-veiculo-externo';
import { VeiculoInternoUsuario } from './usuario-veiculo-interno';

export interface VeiculoModeloGrupo {
    id?: number
    veiculoExterno?: VeiculoExternoUsuario
    veiculoInterno?: VeiculoInternoUsuario
    veiculoModelo?: string
}

export interface VeiculoModeloGrupoSort {
    id?: SortOperationKind
    veiculoModelo?: SortOperationKind
}

export interface VeiculoModeloGrupoFilter {
    id?: FilterInput
    veiculoModelo?: FilterInput
}

export interface VeiculoModeloGrupoSchema extends SchemaInterface {
    nodes: VeiculoModeloGrupo[]
}

export interface create_VeiculoModeloGrupo { data: { grupoVeiculoModelo_Inserir: SchemaInterface }}
export interface read_VeiculoModeloGrupo { grupoVeiculoModelo: VeiculoModeloGrupoSchema }
export interface update_VeiculoModeloGrupo { data: { grupoVeiculoModelo_Alterar: SchemaInterface }}
export interface delete_VeiculoModeloGrupo { data: { grupoVeiculoModelo_Excluir: SchemaInterface }}

export abstract class VeiculoModeloGrupoData {
    abstract createVeiculoModeloGrupo(site: VeiculoModeloGrupo): Observable<create_VeiculoModeloGrupo>;
    abstract readVeiculoModeloGrupos(order?: VeiculoModeloGrupoSort, where?: VeiculoModeloGrupoFilter): Observable<read_VeiculoModeloGrupo>;
    abstract updateVeiculoModeloGrupo(site: VeiculoModeloGrupo): Observable<update_VeiculoModeloGrupo>;
    abstract deleteVeiculoModeloGrupo(id: number): Observable<delete_VeiculoModeloGrupo>;
}