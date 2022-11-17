import { Observable } from 'rxjs';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';

export interface Report {
    codigo: string,
    estilo: string
    informacoes: string
}

export interface GestaoIdentificador {
    id?: number
}

export interface GestaoIdentificadorSort {
    id?: SortOperationKind
}

export interface GestaoIdentificadorFilter {
    id?: FilterInput
}

export interface GestaoIdentificadorSchema extends SchemaInterface {
    nodes: GestaoIdentificador[]
}

export interface read_GestaoIdentificador { grupoPessoa: GestaoIdentificadorSchema }

export abstract class GestaoIdentificadorData {
    abstract readGestaoIdentificadors(order?: GestaoIdentificadorSort, where?: GestaoIdentificadorFilter): Observable<read_GestaoIdentificador>;
    abstract getReports(estilo: string): Observable<Report[]>;
}