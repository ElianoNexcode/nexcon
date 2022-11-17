import { Observable } from 'rxjs';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';
import { AreaReparticao, AreaReparticaoFilter, AreaReparticaoSort } from './reparticao-area';
import { PessoaExternaUsuario } from './usuario-pessoa-externa';
import { PessoaInternaUsuario } from './usuario-pessoa-interna';
import { PessoaInternaUsuarioFilter, PessoaInternaUsuarioSort } from './usuario-pessoa-interna';
import { VeiculoExternoUsuario } from './usuario-veiculo-externo';
import { VeiculoInternoUsuario, VeiculoInternoUsuarioSort } from './usuario-veiculo-interno';

export interface EstacionamentoVaga {
    id?: number
    estacionamentoId: number
    estacionamento?: AreaReparticao
    tipoGaragem: number | string
    garagem: string
    localizacao: string
    usuarioTipo?: number
    areaVinculadaId?: number
    areaVinculada?: AreaReparticao
    usuarioAssociadoId?: number
    usuarioVinculadoId?: number    
    observacao: string
    ultimoAcesso?: Date
    pessoaInterna?: PessoaInternaUsuario
    pessoaExterna?: PessoaExternaUsuario
    veiculoInterno?: VeiculoInternoUsuario
    VeiculoExterno?: VeiculoExternoUsuario    
}

export interface EstacionamentoVagaSort {
    id?: SortOperationKind
    estacionamentoId?: SortOperationKind
    garagem?: SortOperationKind
    localizacao?: SortOperationKind
    observacao?: SortOperationKind
    tipoGaragem?: SortOperationKind
    ultimoAcesso?: SortOperationKind
    unidadeVinculadaId?: SortOperationKind
    usuarioAssociadoId?: SortOperationKind
    usuarioTipo?: SortOperationKind
    usuarioVinculadoId?: SortOperationKind
    estacionamento?: AreaReparticaoSort
    areaVinculada?: AreaReparticaoSort
    pessoaInterna?: PessoaInternaUsuarioSort
    veiculoInterno?: VeiculoInternoUsuarioSort

}

export interface EstacionamentoVagaFilter {
    id?: FilterInput
    estacionamento?: AreaReparticaoFilter
    estacionamentoId?: FilterInput
    areaVinculada?: AreaReparticaoFilter
    pessoaInterna?: PessoaInternaUsuarioFilter
    usuarioTipo?:FilterInput
    tipoGaragem?: FilterInput
    garagem?: FilterInput
    localizacao?: FilterInput
    observacao?: FilterInput
}

export interface EstacionamentoVagaSchema extends SchemaInterface {
    nodes: EstacionamentoVaga[];
    totalCount: number;
}

export interface create_EstacionamentoVaga { data: { reparticaoEstacionamentoVaga_Inserir: SchemaInterface }}
export interface read_EstacionamentoVaga { reparticaoEstacionamentoVaga: EstacionamentoVagaSchema }
export interface update_EstacionamentoVaga { data: { reparticaoEstacionamentoVaga_Alterar: SchemaInterface }}
export interface delete_EstacionamentoVaga { data: { reparticaoEstacionamentoVaga_Excluir: SchemaInterface }}

export abstract class EstacionamentoVagaData {
    abstract createEstacionamentoVaga(site: EstacionamentoVaga): Observable<create_EstacionamentoVaga>;
    abstract readEstacionamentoVagas(order?: EstacionamentoVagaSort, where?: EstacionamentoVagaFilter): Observable<read_EstacionamentoVaga>;
    abstract readEstacionamentoVagasRelat(order?: EstacionamentoVagaSort, where?: EstacionamentoVagaFilter): Observable<read_EstacionamentoVaga>;
    abstract updateEstacionamentoVaga(site: EstacionamentoVaga): Observable<update_EstacionamentoVaga>;
    abstract deleteEstacionamentoVaga(id: number): Observable<delete_EstacionamentoVaga>;
}