import { Data } from '@angular/router';
import { Observable } from 'rxjs';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';
import { NivelAcessoConcessao } from './concessao-nivel-acesso';
import { VeiculoGrupo, VeiculoGrupoSort } from './grupo-veiculo';
import { VeiculoModeloGrupo, VeiculoModeloGrupoFilter, VeiculoModeloGrupoSort } from './grupo-veiculo-modelo';
import { AreaReparticao, AreaReparticaoFilter, AreaReparticaoSort } from './reparticao-area';
import { EmpresaReparticao, EmpresaReparticaoFilter } from './reparticao-empresa';
import { EstacionamentoVaga } from './reparticao-vaga-estacionamento';
import { Abordagem, PessoaInternaUsuario, PessoaInternaUsuarioFilter } from './usuario-pessoa-interna';

export interface CentroCusto {
    centroCusto: string
    id: number
}

export interface VeiculoInternoCondutor {
    pessoaId: number
    pessoaInterna?: PessoaInternaUsuario
    veiculoId?: number
    veiculoInterno?: VeiculoInternoUsuario
}

export interface VeiculoInternoImg {
    imagem: number
    trataImagem:[number]
    veiculoId: number
    veiculoInterno: VeiculoInternoUsuario
}

export interface VeiculoInternoNivelAcesso {
    id:number
    nivelAcesso: NivelAcessoConcessao
    nivelAcessoId: number
    veiculoId: number
    veiculoInterno: VeiculoInternoUsuario
}


export interface VeiculoInternoUsuario {
    id?: number
    imagem?: VeiculoInternoImg
    tipo?: number | string
    placa?: string
    modeloId?: number
    modelo?: VeiculoModeloGrupo | string
    cor?: string
    grupoId?: number
    grupo?: VeiculoGrupo
    caracteristica?: string
    observacao?: string
    peso?: number
    licenciamento?: string
    combustivel?: string
    supervisorId?: number
    supervisor?: PessoaInternaUsuario
    areaId?: number
    area?: AreaReparticao
    localizacao?: string
    complemento1?: string
    complemento2?: string
    complemento3?: string
    complemento4?: string
    centroCustoId?: number
    centroCusto?: CentroCusto
    status?: boolean
    validadeCadastroInicio?: string
    validadeCadastroFim?: string
    condutores?: VeiculoInternoCondutor[]
    garagens?: EstacionamentoVaga[]
    acessoCartao?: number
    acessoCredito?: number
    niveisAcessoPermanente?: VeiculoInternoNivelAcesso[]
    ignorarDirecao?: boolean
    ignorarRota?: boolean
    ignorarTemporizacao?: boolean
    ignorarCredito?: boolean
    ignorarValidacaoExterna?: boolean
    liberarSaidaExpirada?: boolean
    abordagem?: Abordagem
    guid?: number
    presente?: number
}

export interface VeiculoInternoUsuarioSort {
    id?: SortOperationKind
    placa?: SortOperationKind
    tipo?: SortOperationKind
    tag?: SortOperationKind
    supervisor?: SortOperationKind
    observacao?: SortOperationKind
    localizacao?: SortOperationKind
    modelo?: VeiculoModeloGrupoSort
    cor?: SortOperationKind
    grupoId?: SortOperationKind
    grupo?: VeiculoGrupoSort
    complemento1?: SortOperationKind
    complemento2?: SortOperationKind
    complemento3?: SortOperationKind
    complemento4?: SortOperationKind
    caracteristica?: SortOperationKind
    status?: SortOperationKind
    areaId?: SortOperationKind
    area?: AreaReparticaoSort
    setor?: AreaReparticaoSort
}

export interface VeiculoInternoUsuarioFilter {
    id?: FilterInput
    placa?: FilterInput
    tipo?: FilterInput
    modeloId?: FilterInput
    modelo?: VeiculoModeloGrupoFilter   
    complemento1?: FilterInput
    complemento2?: FilterInput
    complemento3?: FilterInput
    complemento4?: FilterInput
    cor?: FilterInput
    supervisor?: PessoaInternaUsuarioFilter
    empresa?: EmpresaReparticaoFilter
    grupoId?: FilterInput
    caracteristica?: FilterInput
    localizacao?: FilterInput
    observacao?: FilterInput
    centroCustoId?: FilterInput
    acessoCartao?: FilterInput
    status?: FilterInput
    areaId?: FilterInput
    area?: AreaReparticaoFilter
    and?: [{cadastroData: FilterInput},
           {cadastroData: FilterInput}]
}

export interface VeiculoInternoUsuarioSchema {
    nodes: VeiculoInternoUsuario []
    totalCount: number
}

export interface create_VeiculoInternoUsuario { data: { usuarioVeiculoInterno_Inserir: SchemaInterface }}
export interface read_VeiculoInternoUsuario   { usuarioVeiculoInterno: VeiculoInternoUsuarioSchema }
export interface update_VeiculoInternoUsuario { data: { usuarioVeiculoInterno_Alterar: SchemaInterface }}
export interface delete_VeiculoInternoUsuario { data: { usuarioVeiculoInterno_Excluir: SchemaInterface }}

export abstract class  VeiculoInternoUsuarioData{
    abstract createVeiculoInternoUsuario (site: VeiculoInternoUsuario): Observable<create_VeiculoInternoUsuario>;
    abstract readVeiculoInternoUsuario  (order?: VeiculoInternoUsuarioSort, where?: VeiculoInternoUsuarioFilter,first?: number): Observable<read_VeiculoInternoUsuario>;
    abstract readVeiculoInternoUsuarioRelat(order?: VeiculoInternoUsuarioSort, where?: VeiculoInternoUsuarioFilter, first?: number):Observable<read_VeiculoInternoUsuario>;
    abstract updateVeiculoInternoUsuario (site: VeiculoInternoUsuario): Observable<update_VeiculoInternoUsuario>;
    abstract deleteVeiculoInternoUsuario (id: number): Observable<delete_VeiculoInternoUsuario>;
    abstract readVeiculoInternoLocalizacoes(): Observable<string[]>;   
}

