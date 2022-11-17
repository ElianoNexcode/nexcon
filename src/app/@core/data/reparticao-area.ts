import { Time } from '@angular/common';
import { Observable } from 'rxjs';
import { Item } from 'src/app/@theme/layouts/treeview/service/treeview';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';
import { NivelAcessoConcessao } from './concessao-nivel-acesso';
import { BloqueioDispositivo, BloqueioDispositivoSort } from './dispositivo-bloqueio';
import { ElevadorDispositivo } from './dispositivo-elevador';
import { PessoaGrupo } from './grupo-pessoa';
import { SetorReparticao, SetorReparticaoFilter, SetorReparticaoSort } from './reparticao-setor';
import { PessoaInternaUsuarioSort } from './usuario-pessoa-interna';
import { VeiculoInternoUsuarioSort } from './usuario-veiculo-interno';

export interface  AreaInterligacao{
    interligacaoAreaId?: number
    interligacaoArea?: AreaReparticao
    interligacaoSetorId?: number
    interligacaoSetor?: SetorReparticao    
}

export interface AreaNivelRotativo {
    area?: AreaReparticao
    nivelAcesso?: NivelAcessoConcessao
    nivelAcessoId?: number
}

export interface AreaControleVisita {
    area?: AreaReparticao
    areaId?: number
    pessoaGrupo?: PessoaGrupo
    pessoaGrupoId?: number
    quantidade?: number
}

export interface AreaReparticao {
    id?: number    
    nome?: string
    tipo?: number | string
    bloqueios?: BloqueioDispositivo[]
    elevadores?: ElevadorDispositivo[]
    localizacao?: string
    observacao?: string
    setorId?: number
    setor?: SetorReparticao
    areaMaeId?: number
    temporizarAcesso?: boolean
    temporizacaoAcesso?: string
    volumePermitido?: number
    idadeMaxima?: number
    idadeMinima?: number
    areasInterligadas?: AreaInterligacao[]
    validarIdentificador?: boolean
    validarContratacao?: boolean
    validarIntegracao?: boolean
    validarSeguranca?: boolean
    validarExameMedico?: boolean
    validarFerias?: boolean
    validarAfastamento?: boolean
    validarHabilitacao?: boolean
    validarLicenciamento?: boolean
    validarCredito?: boolean
    validarGaragem?: boolean
    validacaoExterna?: boolean
    recolherCartao?: boolean
    arquivarIdentificacao?: boolean
    controlarRota?: boolean
    controlarDirecao?: boolean
    controleVisitas?: AreaControleVisita[]
    niveisRotativos?: AreaNivelRotativo[]
}

export interface AreaReparticaoSort {
    id?: SortOperationKind
    nome?: SortOperationKind
    tipo?: SortOperationKind
    localizacao?: SortOperationKind
    volumePermitido?: SortOperationKind
    pessoas?: PessoaInternaUsuarioSort
    bloqueios?: BloqueioDispositivoSort
    veiculos?: VeiculoInternoUsuarioSort
    observacao?: SortOperationKind
    setorId?: SortOperationKind
    setor?: SetorReparticaoSort
    areaMaeId?: SortOperationKind
}
export interface AreaReparticaoFilter {
    id?: FilterInput    
    nome?: FilterInput 
    tipo?: FilterInput
    localizacao?: FilterInput
    observacao?: FilterInput
    setorId?: FilterInput
    setor?: SetorReparticaoFilter

    and?: [{dataCadastro: FilterInput},
           {dataCadastro: FilterInput}]
}
export interface AreaReparticaoSchema extends SchemaInterface {    
    nodes: AreaReparticao[];
    totalCount: number;
}

export interface create_AreaReparticao { data: { reparticaoArea_Inserir: SchemaInterface }}
export interface read_AreaReparticao { reparticaoArea: AreaReparticaoSchema }
export interface update_AreaReparticao { data: { reparticaoArea_Alterar: SchemaInterface }}
export interface delete_AreaReparticao { data: { reparticaoArea_Excluir: SchemaInterface }}
export abstract class AreaReparticaoData {
    abstract createAreaReparticao(site: AreaReparticao): Observable<create_AreaReparticao>;
    abstract readAreaReparticao(order?: AreaReparticaoSort, where?: AreaReparticaoFilter): Observable<read_AreaReparticao>;
    abstract readAreaReparticaoRelat(order?: AreaReparticaoSort, where?: AreaReparticaoFilter): Observable<read_AreaReparticao>;
    abstract updateAreaReparticao(site: AreaReparticao): Observable<update_AreaReparticao>;
    abstract deleteAreaReparticao(id: number): Observable<delete_AreaReparticao>;
    abstract getAreaReparticaoTreeView(filter: AreaReparticaoFilter): Item[];
}
