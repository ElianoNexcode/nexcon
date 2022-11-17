import { Observable } from 'rxjs';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';

export interface PessoaGrupo {
    id?: number
    pessoaGrupo: string
    pessoaInterna?: boolean
    pessoaPrestador?: boolean
    pessoaVisitante?: boolean
}

export interface PessoaGrupoSort {
    id?: SortOperationKind
    pessoaGrupo?: SortOperationKind
    pessoaInterna?: SortOperationKind
    pessoaPrestador?: SortOperationKind
    pessoaVisitante?: SortOperationKind
}

export interface PessoaGrupoFilter {
    id?: FilterInput,
    pessoaGrupo?: FilterInput
    pessoaInterna?: FilterInput
    pessoaPrestador?: FilterInput
    pessoaVisitante?: FilterInput

    or?: [{pessoaPrestador?: FilterInput},
          {pessoaVisitante?: FilterInput}]
}

export interface PessoaGrupoSchema extends SchemaInterface {
    nodes: PessoaGrupo[]
}

export interface create_PessoaGrupo { data: { grupoPessoa_Inserir: SchemaInterface }}
export interface read_PessoaGrupo { grupoPessoa: PessoaGrupoSchema }
export interface update_PessoaGrupo { data: { grupoPessoa_Alterar: SchemaInterface }}
export interface delete_PessoaGrupo { data: { grupoPessoa_Excluir: SchemaInterface }}

export abstract class PessoaGrupoData {
    abstract createPessoaGrupo(site: PessoaGrupo): Observable<create_PessoaGrupo>;
    abstract readPessoaGrupos(order?: PessoaGrupoSort, where?: PessoaGrupoFilter): Observable<read_PessoaGrupo>;
    abstract updatePessoaGrupo(site: PessoaGrupo): Observable<update_PessoaGrupo>;
    abstract deletePessoaGrupo(id: number): Observable<delete_PessoaGrupo>;
}