import { Observable } from 'rxjs';
import { Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';
import { PessoaGrupo } from './grupo-pessoa';
import { AreaReparticao } from './reparticao-area';
import { PessoaExternaUsuario } from './usuario-pessoa-externa';
import { PessoaInternaUsuario } from './usuario-pessoa-interna';
import { VeiculoExternoUsuario } from './usuario-veiculo-externo';
import { VeiculoInternoUsuario } from './usuario-veiculo-interno';

interface centroCustoVisitado {
    centroCusto: string
}
export interface Visitado {
    id?: number
    nome?: string
    area?: AreaReparticao
    centroCusto?: centroCustoVisitado
    grupo?: PessoaGrupo
    localizacao?: string
    telefoneFixo?: string
}
export interface Autorizante {
    id: number
    nome: string
}

export interface Material {
    material: string
    quantidade: number
    notaFiscal: string
    observacao: string
}
export interface IdentificacaoControle {
    id?: number;
    agendamentoId?: number
    identificacaoOrigem?: string
    identificacaoRegistro?: number
    identificacaoProcesso?: number
    identificacaoRecepcao?: string
    identificacaoEstacao?: string
    identificacaoDataHora?: string
    identificacaoOperadorId?: number
    identificacaoOperadorNome?: string
    identificacaoValidadeInicial?: string
    identificacaoValidadeFinal?: string
    siteId?: number
    siteNome?: string
    motivo?: string
    identificadorTipo?: number
    identificador?: number
    acessoCartao?: number
    acessoEntradaAutorizada?: boolean
    acessoEntradaPessoaNome?: string
    acessoEntradaPessoaId?: number
    acessoSaidaAutorizada?: boolean
    acessoSaidaPessoaNome?: string
    acessoSaidaPessoaId?: number
    acessoSaidaForaValidade?: boolean
    acessoIngressoAtribuido?: number
    acessoIngressoCorrente?: number
    acessoIngressoIgnorar?: boolean
    acessoCreditoAtribuido?: number
    acessoCreditoCorrente?: number
    acessoCreditoIgnorar?: boolean
    acessoSenha?: string
    acessoSenhaIgnorar?: boolean
    acessoBiometriaIgnorar?: boolean
    acessoNivel1?: number
    acessoNivel2?: number
    acessoNivel3?: number
    acessoNivel4?: number
    acessoNivel5?: number
    acessoNivel6?: number
    acessoNivel7?: number
    acessoNivel8?: number
    acessoNivel9?: number
    acessoNivel10?: number
    estacionamentoId?: number
    estacionamentoNome?: string
    garagemTipo?: number
    garagemVaga?: string
    areaReservadaId?: number
    areaReservadaNome?: string
    integracao?: string
    observacao?: string

    pessoaTipo?: number
    pessoaExterna?: PessoaExternaUsuario 
    pessoaInterna?: PessoaInternaUsuario

    pessoaId?: number
    pessoaDocTipo?: string
    pessoaDocNumero?: string
    pessoaNome?: string
    pessoaGrupo?: string
    pessoaComplemento1?: string
    pessoaEmpresaId?: number
    pessoaReparticao?: string

    pessoaCargo?: string
    pessoaComplemento2?: string
    pessoaComplemento3?: string
    pessoaComplemento4?: string
    
    visitado?: Visitado 

    visitadoId?: number
    visitadoNome?: string
    visitadoAreaId?: string
    visitadoAreaNome?: string
    visitadoCentroCusto?: string

    autorizante?: Autorizante

    autorizanteId?: number
    autorizanteNome?: string

    veiculoTipo?: number
    veiculoExterno?: VeiculoInternoUsuario

    veiculoId?: number
    veiculoClasse?: string
    veiculoPlaca?: string
    veiculoModelo?: string
    veiculoCor?: string
    veiculoGrupo?: string
    veiculoPeso?: string
    veiculoComplemento1?: string
    veiculoComplemento2?: string
    veiculoComplemento3?: string
    veiculoComplemento4?: string

    suspensoDataHora?: string
    acessoLocalEntrada?: string
    acessoDataHoraEntrada?: string
    statusFinalDataHora?: string
    statusFinalLocal?: string

    identificacaoMateriais?: Material[]
}

export interface IdentificacaoControleSort {
    id?: SortOperationKind
    pessoaNome?: SortOperationKind
    identificacaoDataHora?: SortOperationKind 
    statusFinalDataHora?: SortOperationKind
    suspensoDataHora?: SortOperationKind
    pessoaGrupo?: SortOperationKind
    pessoaRepaticao?: SortOperationKind
    visitadoNome?: SortOperationKind
    visitadoAreaNome?: SortOperationKind
    autorizanteNome?: SortOperationKind
    identificador?: SortOperationKind
    motivo?: SortOperationKind
    recepcao?: SortOperationKind
    operador?: SortOperationKind
    visitadoCentroCusto?: SortOperationKind
    pessoaComplemento1?: SortOperationKind
    pessoaComplemento2?: SortOperationKind
    pessoaComplemento3?: SortOperationKind
    pessoaComplemento4?: SortOperationKind
    veiculoPlaca?: SortOperationKind
    veiculoComplemento1?: SortOperationKind
    veiculoComplemento2?: SortOperationKind
    veiculoComplemento3?: SortOperationKind
    veiculoComplemento4?: SortOperationKind
    estacionamentoNome?: SortOperationKind
    garagemVaga?: SortOperationKind



}

export interface IdentificacaoControleFilter {
    id?: FilterInput
    autorizanteId?: FilterInput
    acessoDataHoraEntrada?: FilterInput
    acessoLocalEntrada?: FilterInput
    identificador?: FilterInput
    identificacaoRegistro?: FilterInput
    identificacaoOrigem?: FilterInput
    identificacaoRecepcao?: FilterInput
    identificacaoLocalTipo?: FilterInput
    identificacaoDataHora?: FilterInput
    identificacaoValidadeInicial?: FilterInput
    identificacaoValidadeFinal?: FilterInput
    identificacaoOperadorId?: FilterInput
    identificacaoOperadorNome?: FilterInput
    identificadorTipo?: FilterInput
    motivo?: FilterInput
    motivo_contains?: FilterInput
    observacao?: FilterInput
    pessoaId?: FilterInput
    pessoaDocTipo?: FilterInput
    pessoaDocNumero?: FilterInput
    pessoaCPF?: FilterInput
    pessoaTipo?: FilterInput
    pessoaNome?: FilterInput
    pessoaGrupo?: FilterInput
    pessoaGrupo_contains?: FilterInput
    pessoaComplemento1?: FilterInput
    pessoaComplemento2?: FilterInput
    pessoaComplemento3?: FilterInput
    pessoaComplemento4?: FilterInput
    pessoaReparticao?: FilterInput
    pessoaEmpresaId?: FilterInput
    siteId?: FilterInput
    siteNome?: FilterInput
    statusFinal?: FilterInput
    suspensoOperadorId?: FilterInput
    suspensoDataHora?: FilterInput
    veiculoId?: FilterInput
    veiculoTipo?: FilterInput
    veiculoClasse?: FilterInput
    veiculoCor?: FilterInput
    veiculoComplemento1?: FilterInput
    veiculoComplemento2?: FilterInput
    veiculoComplemento3?: FilterInput
    veiculoComplemento4?: FilterInput
    visitadoCentroCusto?: FilterInput
    veiculoGrupo?: FilterInput
    veiculoModelo?: FilterInput
    veiculoPlaca?: FilterInput
    visitaCorrente?: FilterInput
    visitadoNome?: FilterInput
    visitadoId?: FilterInput
    visitadoAreaNome?: FilterInput
    estacionamentoId?: FilterInput
    garagemTipo?: FilterInput
    areaReservadaId?: FilterInput
    visitadoLocalizacao?: FilterInput
    and?: [{identificacaoDataHora: FilterInput},
           {identificacaoDataHora: FilterInput}] |
          [{identificacaoValidadeInicial: FilterInput},           
           {identificacaoValidadeFinal: FilterInput}]
}

export interface IdentificacaoControleArqFilter {
    id?: FilterInput
    identificador?: FilterInput
    acessoDataHoraEntrada?: FilterInput
    acessoLocalEntrada?: FilterInput
    identificacaoTipo?: FilterInput
    identificacaoLocalTipo?: FilterInput
    identificacaoDataHora?: FilterInput
    identificacaoValidadeInicial?: FilterInput
    identificacaoValidadeFinal?: FilterInput
    identificacaoOperadorId?: FilterInput
    identificacaoOperadorNome?: FilterInput
    identificadorTipo?: FilterInput
    motivo?: FilterInput
    pessoaId?: FilterInput
    pessoaDocTipo?: FilterInput
    pessoaDocNumero?: FilterInput
    pessoaCPF?: FilterInput
    pessoaTipo?: FilterInput
    pessoaNome?: FilterInput
    pessoaCargo?: FilterInput
    pessoaGrupo?: FilterInput
    pessoaComplemento1?: FilterInput
    pessoaComplemento2?: FilterInput
    pessoaComplemento3?: FilterInput
    pessoaComplemento4?: FilterInput
    pessoaEmpresaId?: FilterInput
    pessoaReparticao?: FilterInput
    siteCode?: FilterInput
    siteId?: FilterInput
    siteNome?: FilterInput
    statusFinal?: FilterInput
    statusFinalDataHora?: FilterInput
    statusFinalLocal?: FilterInput
    suspensoOperadorId?: FilterInput
    suspensoDataHora?: FilterInput
    veiculoId?: FilterInput
    veiculoTipo?: FilterInput
    veiculoClasse?: FilterInput
    veiculoCor?: FilterInput
    veiculoCaracteristica?: FilterInput
    veiculoComplemento1?: FilterInput
    veiculoComplemento2?: FilterInput
    veiculoComplemento3?: FilterInput
    veiculoComplemento4?: FilterInput
    veiculoGrupo?: FilterInput
    veiculoModelo?: FilterInput
    veiculoPlaca?: FilterInput
    visitaCorrente?: FilterInput
    visitadoNome?: FilterInput
    visitadoUnidadeNome?: FilterInput
    visitadoLocalizacao?: FilterInput
}

export interface IdentificacaoControleSchema extends SchemaInterface {
    nodes: IdentificacaoControle[]
    totalCount: number
}

export interface filterSchema { 
    filter: IdentificacaoControleFilter
    filterArq: IdentificacaoControleArqFilter
    order: IdentificacaoControleSort
    first: number
    title: string
}

export interface create_IdentificacaoControle { data: { controleIdentificacao_Inserir: SchemaInterface }}
export interface read_IdentificacaoControle { controleIdentificacao : IdentificacaoControleSchema }
export interface read_IdentificacaoControleArq { controleIdentificacaoArq : IdentificacaoControleSchema }
export interface update_IdentificacaoControle { data: { controleIdentificacao_Alterar: SchemaInterface }}
export interface suspend_IdentificacaoControle { data: { controleIdentificacao_Suspender: SchemaInterface }}
export interface cancel_IdentificacaoControle { data: { controleIdentificacao_Cancelar: SchemaInterface }}
export interface end_IdentificacaoControle { data: { controleIdentificacao_Encerrar: SchemaInterface }}

export abstract class IdentificacaoControleData {

    public registro: Item[] = [{id: 1, text: "VISITA", value: "visita"},
                               {id: 2, text: "P.SERVIÇO", value: "pServico"},
                               {id: 3, text: "PROVISÓRIO", value: "provisorio"}];

    public processo: Item[] = [{id: 1, text: "ÚNICO", value: "unico"},
                               {id: 2, text: "EM GRUPO", value: "emGrupo"},
                               {id: 3, text: "MAIS VISITADOS", value: "maisVisitados"}];

    abstract createIdentificacaoControle(site: IdentificacaoControle): Observable<create_IdentificacaoControle>;
    abstract readIdentificacaoControles(order?: IdentificacaoControleSort, where?: IdentificacaoControleFilter, first?: number): Observable<read_IdentificacaoControle>;
    abstract readIdentificacaoControlesArq(order?: IdentificacaoControleSort, where?: IdentificacaoControleFilter, first?: number): Observable<read_IdentificacaoControleArq>;

    abstract readIdentificacaoControlesRelat(order?: IdentificacaoControleSort, where?: IdentificacaoControleFilter, first?: number): Observable<read_IdentificacaoControle>;
    abstract readIdentificacaoControlesArqRelat(order?: IdentificacaoControleSort, where?: IdentificacaoControleFilter, first?: number): Observable<read_IdentificacaoControleArq>;

    abstract updateIdentificacaoControle(site: IdentificacaoControle): Observable<update_IdentificacaoControle>;
    abstract suspendIdentificacaoControle(id: number, suspendoOperadorId: number, suspensoOperadorNome: string, suspensoObservacao: string): Observable<suspend_IdentificacaoControle>;
    abstract cancelIdentificacaoControle(id: number, statusFinalPessoaId: number, statusFinalPessoaNome: string, statusFinalLocal: string, statusFinalObservacao: string): Observable<cancel_IdentificacaoControle>;
    abstract endIdentificacaoControle(id: number, statusFinalPessoaId: number, statusFinalPessoaNome: string, statusFinalLocal: string, statusFinalObservacao: string): Observable<end_IdentificacaoControle>;
    abstract getFilterSchema(periodo: string, siteId: number, operadorId: number): any;
}