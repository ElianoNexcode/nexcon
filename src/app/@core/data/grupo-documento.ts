import { Observable } from 'rxjs';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';

export interface DocumentoGrupo {
    id?: number
    tipo: string
    ordem?: number
    interno: boolean
    prestador: boolean
    visitante: boolean
    nexiun: boolean
    nexflow: boolean
    nexmove: boolean
    nextot: boolean
}

export interface DocumentoGrupoSort {
    id?: SortOperationKind
    tipo?: SortOperationKind
    ordem?: SortOperationKind
    interno?: SortOperationKind
    prestador?: SortOperationKind
    visitante?: SortOperationKind
}

export interface DocumentoGrupoFilter {
    id?: FilterInput
    tipo?: FilterInput
    interno?: FilterInput
    prestador?: FilterInput
    visitante?: FilterInput

    or?: [{prestador?: FilterInput},
          {visitante?: FilterInput}]
}

export interface DocumentoGrupoSchema extends SchemaInterface {
    nodes: DocumentoGrupo[]
    totalCount: number
}

export interface create_DocumentoGrupo { data: { grupoDocumento_Inserir: SchemaInterface }}
export interface read_DocumentoGrupo { grupoDocumento: DocumentoGrupoSchema }
export interface update_DocumentoGrupo { data: { grupoDocumento_Alterar: SchemaInterface }}
export interface delete_DocumentoGrupo { data: { grupoDocumento_Excluir: SchemaInterface }}

export abstract class DocumentoGrupoData {
    abstract createDocumentoGrupo(site: DocumentoGrupo): Observable<create_DocumentoGrupo>;
    abstract readDocumentoGrupos(order?: DocumentoGrupoSort, where?: DocumentoGrupoFilter): Observable<read_DocumentoGrupo>;
    abstract updateDocumentoGrupo(site: DocumentoGrupo): Observable<update_DocumentoGrupo>;
    abstract deleteDocumentoGrupo(id: number): Observable<delete_DocumentoGrupo>;
    abstract countDocumentoGrupos(where?: DocumentoGrupoFilter): Observable<read_DocumentoGrupo>;    
}