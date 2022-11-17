import { Observable } from 'rxjs';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';

export interface IdentificacaoGrupo {
    id?: number
    motivo: string
    interno: boolean
    prestador: boolean
    visitante: boolean
    tempoPrimeiroAcesso: number
    tempoPermanencia: number
    nexiun: boolean
    nexflow: boolean
    nexmove: boolean
    nextot: boolean
}

export interface IdentificacaoGrupoSort {
    id?: SortOperationKind
    motivo?: SortOperationKind
    interno?: SortOperationKind
    prestador?: SortOperationKind
    visitante?: SortOperationKind
    tempoPrimeiroAcesso?: SortOperationKind
    tempoPermanencia?: SortOperationKind
}

export interface IdentificacaoGrupoFilter {
    id?: FilterInput
    motivo?: FilterInput
    interno?: FilterInput
    prestador?: FilterInput
    visitante?: FilterInput
    tempoPrimeiroAcesso?: FilterInput
    tempoPermanencia?: FilterInput
}

export interface IdentificacaoGrupoSchema extends SchemaInterface {
    nodes: IdentificacaoGrupo[]
}

export interface create_IdentificacaoGrupo { data: { grupoIdentificacao_Inserir: SchemaInterface }}
export interface read_IdentificacaoGrupo { grupoIdentificacaoMotivo: IdentificacaoGrupoSchema }
export interface update_IdentificacaoGrupo { data: { grupoIdentificacao_Alterar: SchemaInterface }}
export interface delete_IdentificacaoGrupo { data: { grupoIdentificacao_Excluir: SchemaInterface }}

export abstract class IdentificacaoGrupoData {
    abstract createIdentificacaoGrupo(site: IdentificacaoGrupo): Observable<create_IdentificacaoGrupo>;
    abstract readIdentificacaoGrupos(order?: IdentificacaoGrupoSort, where?: IdentificacaoGrupoFilter): Observable<read_IdentificacaoGrupo>;
    abstract updateIdentificacaoGrupo(site: IdentificacaoGrupo): Observable<update_IdentificacaoGrupo>;
    abstract deleteIdentificacaoGrupo(id: number): Observable<delete_IdentificacaoGrupo>;
}