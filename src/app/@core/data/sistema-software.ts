import { Observable } from 'rxjs';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';

export interface Software {
    id: number
    softwareId?: number
    software: string
    alias: string
    relevancia: string

    plataformaIP?: string
    plataformaExt?: string
    plataformaPorta?: number

    registryIP?: string
    registryPorta?: number

    notificationIP?: string
    notificationPorta1?: number
    notificationPorta2?: number

    utilityIP?: string
    utilityPorta?: number

    utilBackupTipo?: number
    utilBackupHora?: string
    utilBackupRetencao?: number
    utilBackupDiretorio?: string

    utilLimpezaTipo?: number
    utilLimpezaHora?: string
    utilLimpezaVisitaAgenda?: number
    utilLimpezaIdentificacao?: number
    utilLimpezaAlarme?: number
    utilLimpezaAcesso?: number
    utilLimpezaEmail?: number
    utilLimpezaLogOperador?: number
    utilLimpezaLogSistema?: number

    mobileIP?: string
    mobilePorta1?: number
    mobilePorta2?: number

    integrationIP?: string
    integrationPorta?: number
    integrationLogin?: string
    integrationSenha?: string

    status?: number
    estado?: number

    observacao?: string

    versao?: string
    start?: Date

    login?: string
    senha?: string
}

export interface SoftwareSistema {

    id: number

    plataformaIP?: string
    plataformaPorta?: number
    plataformaExt?: string
    plataformaCheck?: Date
    plataformaStart?: Date
    plataformaVersao?: string
    plataformaObservacao?: string

    registryIP?: string
    registryPorta?: number
    registryCheck?: Date
    registryStart?: Date
    registryVersao?: string
    registryObservacao?: string
    
    notificationIP?: string
    notificationPorta1?: number
    notificationPorta2?: number
    notificationCheck?: Date
    notificationStart?: Date
    notificationVersao?: string
    notificationObservacao?: string
    
    utilityIP?: string
    utilityPorta?: number
    utilityCheck?: Date
    utilityStart?: Date
    utilityVersao?: string
    utilityObservacao?: string
    
    mobileIP?: string
    mobilePorta1?: number
    mobilePorta2?: number
    mobileStatus?: boolean
    mobileCheck?: Date
    mobileStart?: Date
    mobileVersao?: string
    mobileObservacao?: string
    
    utilBackupTipo?: number
    utilBackupDiretorio?: string
    utilBackupHora?: string
    utilBackupRetencao?: number
    utilBackupControle?: number
    utilityStatus?: boolean

    utilLimpezaTipo?: number
    utilLimpezaHora?: string
    utilLimpezaVisitaAgenda?: number
    utilLimpezaIdentificacao?: number
    utilLimpezaAlarme?: number
    utilLimpezaAcesso?: number
    utilLimpezaEmail?: number
    utilLimpezaLogOperador?: number
    utilLimpezaLogSistema?: number
    
    integrationIP?: string
    integrationPorta?: number
    integrationLogin?: string
    integrationSenha?: string
    integrationStatus?: boolean
    integrationCheck?: Date
    integrationStart?: Date
    integrationVersao?: string
    integrationObservacao?: string
}

export interface LogSistema {
    id: number
    sistema: string
    descricao: string
    evento: string
    dataHora: string
}

export interface LogSistemaSort {
    id?: SortOperationKind
    sistema?: SortOperationKind
    evento?: SortOperationKind
    descricao?: SortOperationKind
    dataHora?: SortOperationKind
}

export interface LogSistemaFilter {
    id?: FilterInput
    sistema?: FilterInput
    evento?: FilterInput
    descricao?: FilterInput
    and?: [{dataHora: FilterInput},
           {dataHora: FilterInput}]
}

export interface LogOperacao {
    dataHora: string
    id: number
    descricao: string
    funcao: string
    operacao: string
    operadorPessoaNome: string
    operadorPessoaId: number
    operadorNivelOperacao: string
    sistema: string
}

export interface LogOperacaoSort {
    id?: number
    descricao?: string
    dataHora?: SortOperationKind
    operadorPessoaNome?: SortOperationKind
    operadorNivelOperacao?: SortOperationKind
    sistema?: SortOperationKind
    evento?: SortOperationKind
    operacao?: SortOperationKind

}

export interface LogOperacaoFilter {
    descricao?: FilterInput
    operadorPessoaId?: FilterInput
    operadorPessoaNome?: FilterInput
    operadorNivelOperacao?: FilterInput
    sistema?: FilterInput
    evento?: FilterInput
    operacao?: FilterInput
    and?: [{dataHora: FilterInput},
           {dataHora: FilterInput}]

}


export interface SoftwareSistemaSchema extends SchemaInterface {
    nodes: SoftwareSistema
}

export interface LogSistemaSchema extends SchemaInterface {
    nodes: LogSistema[]
    totalCount: number
}

export interface LogSistemaSchema extends SchemaInterface {
    nodes: LogSistema[]
    totalCount: number
}

export interface LogOperacaoSchema extends SchemaInterface {
    nodes: LogOperacao[]
    totalCount: number
}

export interface read_SoftwareSistema { sistemaSoftware: SoftwareSistemaSchema }
export interface read_LogSistema { logSistema: LogSistemaSchema}
export interface read_LogOperacao { logOperacao: LogOperacaoSchema}

export interface update_SoftwarePlataforma { data: { sistemaSoftwarePlataforma_Alterar: SchemaInterface }}
export interface update_SoftwareRegistry { data: { sistemaSoftwareRegistry_Alterar: SchemaInterface }}
export interface update_SoftwareNotification { data: { sistemaSoftwareNotification_Alterar: SchemaInterface }}
export interface update_SoftwareUtility { data: { sistemaSoftwareUtility_Alterar: SchemaInterface }}
export interface update_SoftwareMobile { data: { sistemaSoftwareMobile_Alterar: SchemaInterface }}
export interface update_SoftwareIntegration { data: { sistemaSoftwareIntegration_Alterar: SchemaInterface }}

export abstract class SoftwareData {
    abstract readSoftwareSistema(): Observable<read_SoftwareSistema>;
    abstract readLogSistema(order?: LogSistemaSort, where?: LogSistemaFilter): Observable<read_LogSistema>;
    abstract readLogOperacao(order?: LogOperacaoSort, where?: LogOperacaoFilter): Observable<read_LogOperacao>;

    abstract updateSoftwarePlataforma(data: SoftwareSistema): Observable<update_SoftwarePlataforma>;
    abstract updateSoftwareRegistry(data: SoftwareSistema): Observable<update_SoftwareRegistry>;
    abstract updateSoftwareNotification(data: SoftwareSistema): Observable<update_SoftwareNotification>;
    abstract updateSoftwareUtility(data: SoftwareSistema): Observable<update_SoftwareUtility>;
    abstract updateSoftwareMobile(data: SoftwareSistema): Observable<update_SoftwareMobile>;
    abstract updateSoftwareIntegration(data: SoftwareSistema): Observable<update_SoftwareIntegration>;
}