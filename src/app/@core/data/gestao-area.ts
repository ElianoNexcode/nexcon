import { Observable } from 'rxjs';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';

export interface Report {
    codigo: string,
    estilo: string
    informacoes: string
}

export interface GestaoArea {
    id?: number
}

export interface GestaoAreaSort {
    id?: SortOperationKind
}

export interface GestaoAreaFilter {
    id?: FilterInput
}

export interface GestaoAreaSchema extends SchemaInterface {
    nodes: GestaoArea[]
}

export interface read_GestaoArea { grupoPessoa: GestaoAreaSchema }

export abstract class GestaoAreaData {
    abstract readGestaoAreas(order?: GestaoAreaSort, where?: GestaoAreaFilter): Observable<read_GestaoArea>;
    abstract getReports(estilo: string): Observable<Report[]>;
}