import { Observable } from 'rxjs';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';

export interface Report {
    codigo: string,
    estilo: string
    informacoes: string
}

export interface GestaoUsuario {
    id?: number
}

export interface GestaoUsuarioSort {
    id?: SortOperationKind
}

export interface GestaoUsuarioFilter {
    id?: FilterInput
}

export interface GestaoUsuarioSchema extends SchemaInterface {
    nodes: GestaoUsuario[]
}

export interface read_GestaoUsuario { grupoPessoa: GestaoUsuarioSchema }

export abstract class GestaoUsuarioData {
    abstract readGestaoUsuarios(order?: GestaoUsuarioSort, where?: GestaoUsuarioFilter): Observable<read_GestaoUsuario>;
    abstract getReports(pessoaTipo: number, estilo: string): Observable<Report[]>;
}