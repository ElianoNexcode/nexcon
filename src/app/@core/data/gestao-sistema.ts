import { Observable } from 'rxjs';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';

export interface Report {
    codigo: string
    estilo: string
    informacoes: string
}

export interface GestaoSistema {
    id?: number
}

export interface GestaoSistemaSort {
    id?: SortOperationKind
}

export interface GestaoSistemaFilter {
    id?: FilterInput
}

export interface GestaoSistemaSchema extends SchemaInterface {
    nodes: GestaoSistema[]
}

export interface read_GestaoSistema { grupoPessoa: GestaoSistemaSchema }

export abstract class GestaoSistemaData {
    abstract readGestaoSistemas(order?: GestaoSistemaSort, where?: GestaoSistemaFilter): Observable<read_GestaoSistema>;
    abstract getReports(estilo: string): Observable<Report[]>;
}