import { Observable } from 'rxjs';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';

export interface Report {
    codigo: string,
    estilo: string
    informacoes: string
}

export interface GestaoOperacao {
    id?: number
}

export interface GestaoOperacaoSort {
    id?: SortOperationKind
}

export interface GestaoOperacaoFilter {
    id?: FilterInput
}

export interface GestaoOperacaoSchema extends SchemaInterface {
    nodes: GestaoOperacao[]
}

export interface read_GestaoOperacao { grupoPessoa: GestaoOperacaoSchema }

export abstract class GestaoOperacaoData {
    abstract readGestaoOperacaos(order?: GestaoOperacaoSort, where?: GestaoOperacaoFilter): Observable<read_GestaoOperacao>;
    abstract getReports(estilo: string): Observable<Report[]>;
}