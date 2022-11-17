import { Observable } from 'rxjs';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';
import { EmpresaGrupoFilter, EmpresaGrupoSort } from './grupo-empresa';
import { PessoaInternaUsuarioSort } from './usuario-pessoa-interna';

export interface EmpresaReparticao {
    id?: number
    grupoId: number
    nome: string
    gestor: string
    telefone1: string
    telefone2: string
    email: string
    observacao: string
    razaoSocial: string
    cnpj: string
    ie: string
    complemento1: string
    complemento2: string
    classificacao: number
    enderecoLogradouro: string
    enderecoNumero: string
    enderecoComplemento: string
    enderecoBairro: string
    enderecoCep: string
    enderecoCidade: string
    enderecoEstado: string
    enderecoPais: string
    sites: number[];
    dataCadastro?: Date
}

export interface Sites {
    id: number
    nome: string
}
export interface EmpresaReparticaoSort {
    id?: SortOperationKind
    nome?: SortOperationKind
    empresaGrupo?: EmpresaGrupoSort
    gestor?: SortOperationKind
    telefone1?: SortOperationKind
    telefone2?: SortOperationKind
    email?: SortOperationKind
    classificacao?: SortOperationKind
    dataCadastro?: SortOperationKind
    complemento1?: SortOperationKind
    complemento2?: SortOperationKind
    pessoaInterna?: PessoaInternaUsuarioSort
}
export interface EmpresaReparticaoFilter {    // Where
    id?: FilterInput
    grupoId?: FilterInput
    empresaGrupo?: EmpresaGrupoFilter
    nome?: FilterInput
    gestor?: FilterInput
    telefone1?: FilterInput
    telefone2?: FilterInput
    email?: FilterInput
    classificacao?: FilterInput
    complemento1?: FilterInput
    complemento2?: FilterInput


    and?: [{dataCadastro: FilterInput},
           {dataCadastro: FilterInput}]
}

export interface EmpresaReparticaoSchema extends SchemaInterface {
    nodes: EmpresaReparticao[]
    totalCount: number
}

export interface create_EmpresaReparticao { data: { reparticaoEmpresa_Inserir: SchemaInterface }}
export interface read_EmpresaReparticao { reparticaoEmpresa: EmpresaReparticaoSchema }
export interface update_EmpresaReparticao { data: { reparticaoEmpresa_Alterar: SchemaInterface }}
export interface delete_EmpresaReparticao { data: { reparticaoEmpresa_Excluir: SchemaInterface }}

export abstract class EmpresaReparticaoData {
    abstract createEmpresaReparticao(site: EmpresaReparticao): Observable<create_EmpresaReparticao>;
    abstract readEmpresaReparticaos(order?: EmpresaReparticaoSort, where?: EmpresaReparticaoFilter): Observable<read_EmpresaReparticao>;
    abstract readEmpresaReparticaoRelat(order?: EmpresaReparticaoSort, where?: EmpresaReparticaoFilter): Observable<read_EmpresaReparticao>;
    abstract updateEmpresaReparticao(site: EmpresaReparticao): Observable<update_EmpresaReparticao>;
    abstract deleteEmpresaReparticao(id: number): Observable<delete_EmpresaReparticao>;
}