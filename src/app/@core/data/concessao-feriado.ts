import { Observable } from 'rxjs';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';

export interface FeriadoConcessao {
    id?: number 
    dia: number
    mes: number
    nome: string
    observacao: string
}

export interface FeriadoSort {
    id?: SortOperationKind
    dia?: SortOperationKind
    mes?: SortOperationKind
    nome?: SortOperationKind
    observacao?: SortOperationKind
}

export interface FeriadoFilter {
    id?: FilterInput
    dia?: FilterInput
    mes?: FilterInput
    nome?: FilterInput
    observacao?: FilterInput
}

export interface FeriadoConcessaoSchema extends SchemaInterface {
    nodes: FeriadoConcessao[]
}

export interface create_FeriadoConcessao { data: { concessaoFeriado_Inserir: SchemaInterface }}
export interface read_FeriadoConcessao { concessaoFeriado: FeriadoConcessaoSchema }
export interface update_FeriadoConcessao { data: { concessaoFeriado_Alterar: SchemaInterface }}
export interface delete_FeriadoConcessao { data: { concessaoFeriado_Excluir: SchemaInterface }}

export abstract class FeriadoConcessaoData {
    abstract createFeriadoConcessao(site: FeriadoConcessao): Observable<create_FeriadoConcessao>;
    abstract readFeriadoConcessaos(order?: FeriadoSort, where?: FeriadoFilter): Observable<read_FeriadoConcessao>;
    abstract updateFeriadoConcessao(site: FeriadoConcessao): Observable<update_FeriadoConcessao>;
    abstract deleteFeriadoConcessao(id: number): Observable<delete_FeriadoConcessao>;
}