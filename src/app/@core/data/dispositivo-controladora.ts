import { Observable } from 'rxjs';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';
import { Site, SiteFilter, SiteSort } from './reparticao-site';


export interface ControladoraDispositivoLeitor {
    botaoCr?: number
    buzzer?: number
    cofre?: number
    controladora?: ControladoraDispositivo
    controladoraId?: number
    controle?: number
    dispositivoId?: number
    dispositivoTipo?: number
    evento?:number
    intertravamento?:string
    leitor?: number
    programacaoAtuacao?: number
    programacaoFinal?: Date
    programacaoInicial?: Date
    protocolo?: number
    rele?: number
    releitura?:number
    terminalId?: number
    validacaoExtra?: number
}

export interface ControladoraDispositivo {
    id?: number
    siteId?: number
    site?: Site
    nome: string
    tipo: number
    localizacao: string
    redeIP: string
    redeMascara: string
    redeGateway: string
    login: string
    senha: string    
    start?: Date
    check?: Date
    observacao: string  
    status: number
    bloqueioTipo: number
    bloqueioOrientacao: number
    validacao: number
    biometria: number
    autenticacao: number
    displayIdioma?: number
    displayMsg?: string
    rele?: number
    concentradorId?: number 
    controladorasLeitor?: ControladoraDispositivoLeitor [] 
}

export interface ControladoraDispositivoSort {
    id?: SortOperationKind
    site?: SiteSort
    nome?: SortOperationKind
    tipo?: SortOperationKind
    localizacao?: SortOperationKind
    redeIp?: SortOperationKind
    redeMascara?: SortOperationKind
    redeGateway?: SortOperationKind
    login?:SortOperationKind
    senha?:SortOperationKind
    dataHoraAtual?: SortOperationKind
    dataHoraInicio?: SortOperationKind
    observacao?: SortOperationKind
    status?: SortOperationKind
    bloqueioTipo?: SortOperationKind
    bloqueioOrientacao?: SortOperationKind
    validacao?: SortOperationKind
    biockeck?: SortOperationKind
    autenticacao?: SortOperationKind
    displayIdioma?: SortOperationKind
    displayMsg?: SortOperationKind
    rele?: SortOperationKind
}

export interface ControladoraDispositivoFilter {
    id?: FilterInput
    site?: SiteFilter
    nome?: FilterInput
    tipo?: FilterInput
    localizacao?: FilterInput
    redeIp?: FilterInput
    redeMascara?: FilterInput
    redeGateway?: FilterInput
    login?: FilterInput
    senha?: FilterInput
    observacao?: FilterInput
    status?: FilterInput
    bloqueioTipo?: FilterInput
    bloqueioOrientacao?: FilterInput
    validacao?: FilterInput
    biockeck?: FilterInput
    autenticacao?: FilterInput
    displayIdioma?: FilterInput
    displayMsg?: FilterInput
    rele?: FilterInput
    concentradorId?: FilterInput
}

export interface ControladoraDispositivoSchema extends SchemaInterface {
    nodes: ControladoraDispositivo[]
}

export interface create_ControladoraDispositivo { data: { dispositivoControladora_Inserir: SchemaInterface }}
export interface read_ControladoraDispositivo { dispositivoControladora: ControladoraDispositivoSchema }
export interface update_ControladoraDispositivo { data: { dispositivoControladora_Alterar: SchemaInterface }}
export interface delete_ControladoraDispositivo { data: { dispositivoControladora_Excluir: SchemaInterface }}

export abstract class ControladoraDispositivoData {
    abstract createControladoraDispositivo(site: ControladoraDispositivo): Observable<create_ControladoraDispositivo>;
    abstract readControladoraDispositivos(order?: ControladoraDispositivoSort, where?: ControladoraDispositivoFilter): Observable<read_ControladoraDispositivo>;
    abstract updateControladoraDispositivo(site: ControladoraDispositivo): Observable<update_ControladoraDispositivo>;
    abstract deleteControladoraDispositivo(id: number): Observable<delete_ControladoraDispositivo>;
}