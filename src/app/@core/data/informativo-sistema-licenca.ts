import { Observable } from 'rxjs';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';


export interface InformativoSistemaLicenca {
    atualizacao?: string
    controle?: string
    licenca?: string
    licenciado?: string
    nexcess?: string
    nexcodeAccess?: string
    nexcodeElevator?: string
    nexcodeIntegration?: string
    nexcodeSurveillance: string
    nexcon?: string
    nexiun?: string
    nexnote?: string
    nextot?: string
    nexview?: string
    observacao?: string
    plataforma?: string
    programacao?: string
    registro?: string
    versao?: string
    virtualizacao?: string
}

export interface read_InformativoSistemaLicenca { sistemaLicenca: InformativoSistemaLicenca };
export abstract class InformativoSistemaLicencaData {
    abstract readInformativoSistemaLicenca(): Observable<read_InformativoSistemaLicenca>;
}