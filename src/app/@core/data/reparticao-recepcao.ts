import { Observable } from 'rxjs';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';
import { NivelAcessoConcessao } from './concessao-nivel-acesso';
import { EstacaoDispositivo } from './dispositivo-estacao';
import { AreaReparticao } from './reparticao-area';

export interface RecepcaoEstacionamento {
    areaId?: number
    estacionamento?: AreaReparticao
    recepcao?: RecepcaoReparticao
    recepcaoId?: number
}

export interface RecepcaoNivelAcesso {
    nivelAcesso?: NivelAcessoConcessao
    nivelAcessoId?: number
    nivelAcessoPadrao?: boolean
    recepcao?: RecepcaoReparticao
    recepcaoId?: number
}

export interface RecepcaoReparticao {
    id?: number
    siteId: number

    nome: string
    localizacao?: string
    telefone1?: string
    telefone2?: string
    email?: string
    observacao?: string

    controle?: number
    iniciarCadastro?: number
    capturarImagem?: number
    identificador?: number

    notificarMenor?: number
    notificarMaior?: number

    campoComplemento?: boolean
    campoEmpresa?: boolean
    campoEmail?: boolean
    campoMotivo?: boolean
    campoObservacao?: boolean
    campoTelefone?: boolean
    campoVeiculo?: boolean

    apresentarFelicitacao?: boolean
    apresentaUltimoVisitado?: boolean
    arquivarRegistro?: boolean
    ativarExclusaoPrestador?: boolean
    ativarExclusaoVisitante?: boolean
    ativarCaptura?: boolean
    imprimirCracha?: boolean
    enviarEmailVisitante?: boolean
    notificarVisitadoNexmove?: boolean
    notificarVisitadoSms?: boolean
    notificarVisitadoEmail?: boolean
    identificarAutorizante?: boolean
    identificarGaragem?: boolean
    identificarVeiculo?: boolean

    desativarCampoVeiculo?: boolean
    informarPresencaVisitado?: boolean

    internoTipoDocId?: number
    internoMotivoId?: number
    internoIngresso?: number
    internoCrachaId?: number
    internoAutorizacao?: number

    prestadorTipoDocId?: number
    prestadorGrupoId?: number
    prestadorMotivoId?: number
    prestadorIngresso?: number
    prestadorCrachaId?: number
    prestadorAutorizacao?: number

    visitanteTipoDocId?: number
    visitanteGrupoId?: number
    visitanteMotivoId?: number
    visitanteIngresso?: number
    visitanteCrachaId?: number
    visitanteAutorizacao?: number
    estacao?: EstacaoDispositivo
    estacionamentos?: RecepcaoEstacionamento[]
    niveisAcessos?: RecepcaoNivelAcesso[]
}

export interface RecepcaoReparticaoSort {
    id?: SortOperationKind
    siteId?: SortOperationKind
    nome?: SortOperationKind
    observacao?: SortOperationKind
}

export interface RecepcaoReparticaoFilter {
    id?: FilterInput
    siteId?: FilterInput
    nome?: FilterInput
    telefone1?: FilterInput
    email?: FilterInput
    observacao?: FilterInput
}

export interface RecepcaoReparticaoSchema extends SchemaInterface {
    nodes: RecepcaoReparticao[]
    totalCount: number
}

export interface create_RecepcaoReparticao { data: { reparticaoRecepcao_Inserir: SchemaInterface }}
export interface read_RecepcaoReparticao { reparticaoRecepcao: RecepcaoReparticaoSchema }
export interface update_RecepcaoReparticao { data: { reparticaoRecepcao_Alterar: SchemaInterface }}
export interface delete_RecepcaoReparticao { data: { reparticaoRecepcao_Excluir: SchemaInterface }}

export abstract class RecepcaoData {
    abstract createRecepcaoReparticao(recepcao: RecepcaoReparticao): Observable<create_RecepcaoReparticao>;
    abstract readRecepcaoReparticao(order?: RecepcaoReparticaoSort, where?: RecepcaoReparticaoFilter): Observable<read_RecepcaoReparticao>;
    abstract updateRecepcaoReparticao(recepcao: RecepcaoReparticao): Observable<update_RecepcaoReparticao>;
    abstract deleteRecepcaoReparticao(id: number): Observable<delete_RecepcaoReparticao>;
}
