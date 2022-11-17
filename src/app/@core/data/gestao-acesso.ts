import { Observable } from 'rxjs';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';

export interface Report {
    codigo: string
    estilo: string
    informacoes: string
}

export interface GestaoAcesso {
    id?: number
}

export interface GestaoAcessoSort {
    id?: SortOperationKind
}

export interface GestaoAcessoFilter {
    id?: FilterInput
}

export interface GestaoAcessoSchema extends SchemaInterface {
    nodes: GestaoAcesso[]
}

export interface read_GestaoAcesso { grupoPessoa: GestaoAcessoSchema }

export abstract class GestaoAcessoData {
    abstract readGestaoAcessos(order?: GestaoAcessoSort, where?: GestaoAcessoFilter): Observable<read_GestaoAcesso>;
    abstract getReports(tipo: String): Observable<Report[]>;
}