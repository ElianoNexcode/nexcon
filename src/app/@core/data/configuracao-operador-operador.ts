import { Observable } from 'rxjs';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';
import { NivelOperacaoQuery } from './operador-nivel-operacao';
import { PessoaInternaUsuario, PessoaInternaUsuarioFilter, PessoaInternaUsuarioSort } from './usuario-pessoa-interna';

export interface OperadorConfiguracao {

    imagem?: {
        imagem: Array<number>
    }
    cadastroData?: number
    interfaceDefinida: number
    nivelOperacaoId: number
    nivelOperacao?: NivelOperacaoQuery
    operadorPessoaId: number
    operadorPessoa?: PessoaInternaUsuario
    login: string
    senha: string
    observacao: string
    loginDataHora?: Date
    logoutDataHora?: Date
    status: boolean

}

export interface OperadorConfiguracaoSort {
    cadastroData?: SortOperationKind
    interfaceDefinida?: SortOperationKind
    nivelOperacaoId?: SortOperationKind
    nivelOperacao?: SortOperationKind
    operadorPessoaId?: SortOperationKind
    operadorPessoa?: PessoaInternaUsuarioSort
    login?: SortOperationKind
    senha?: SortOperationKind
    observacao?: SortOperationKind
    loginDataHora?: SortOperationKind
    logoutDataHora?: SortOperationKind
    status?: SortOperationKind
}

export interface OperadorConfiguracaoFilter {
    cadastroData?: FilterInput
    interfaceDefinida?: FilterInput
    nivelOperacaoId?: FilterInput
    nivelOperacao?: FilterInput
    operadorPessoaId?: FilterInput
    operadorPessoa?: PessoaInternaUsuarioFilter
    login?: FilterInput
    senha?: FilterInput
    observacao?: FilterInput
    loginDataHora?: FilterInput
    logoutDataHora?: FilterInput
    status?: FilterInput
}

export interface OperadorConfiguracaoSchema extends SchemaInterface {
    nodes: OperadorConfiguracao[]
}

export interface create_OperadorConfiguracao { data: { operador_Inserir: SchemaInterface }}
export interface read_OperadorConfiguracao { operador: OperadorConfiguracaoSchema }
export interface update_OperadorConfiguracao { data: { operador_Alterar: SchemaInterface }}
export interface delete_OperadorConfiguracao { data: { operador_Excluir: SchemaInterface }}

export abstract class OperadorConfiguracaoData {
    abstract createOperadorConfiguracao(site: OperadorConfiguracao): Observable<create_OperadorConfiguracao>;
    abstract readOperadorConfiguracaos(order?: OperadorConfiguracaoSort, where?: OperadorConfiguracaoFilter): Observable<read_OperadorConfiguracao>;
    abstract updateOperadorConfiguracao(site: OperadorConfiguracao): Observable<update_OperadorConfiguracao>;
    abstract deleteOperadorConfiguracao(id: number): Observable<delete_OperadorConfiguracao>;
}