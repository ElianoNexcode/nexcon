import { Observable } from 'rxjs';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';

export interface FaixaHorariasConcessao {
    faixaHorariaId?: number
    faixaTipo?:number
    faixaHoraria?: FaixaHorariaConcessao
}

export interface FaixaHorariaConcessao {
    id?: number 
    horaInicial?: string
    horaFinal?: string
    ignorarValidacao?: boolean
    nome?: string 
    observacao?: string
    domingo?: boolean
    segunda?: boolean
    terca?: boolean
    quarta?: boolean
    quinta?: boolean
    sexta?: boolean
    sabado?: boolean
    feriado?: boolean
}

export interface FaixaHorariaSort {
    id?: SortOperationKind
    horaInicial?: SortOperationKind
    horaFinal?: SortOperationKind
    ignorarValidacao?: SortOperationKind
    nome?: SortOperationKind 
    observacao?: SortOperationKind
    domingo?: SortOperationKind
    segunda?: SortOperationKind
    terca?: SortOperationKind
    quarta?: SortOperationKind
    quinta?: SortOperationKind
    sexta?: SortOperationKind
    sabado?: SortOperationKind
    feriado?: SortOperationKind
}

export interface FaixaHorariaFilter {
    id?: FilterInput
    horaInicial?: FilterInput
    horaFinal?: FilterInput
    ignorarValidacao?: FilterInput
    nome?: FilterInput
    observacao?: FilterInput
    domingo?: FilterInput
    segunda?: FilterInput
    terca?: FilterInput
    quarta?: FilterInput
    quinta?: FilterInput
    sexta?: FilterInput
    sabado?: FilterInput
    feriado?: FilterInput
}

export interface FaixaHorariaConcessaoSchema extends SchemaInterface {
    nodes: FaixaHorariaConcessao[]
}

export interface create_FaixaHorariaConcessao { data: { concessaoFaixaHoraria_Inserir: SchemaInterface }}
export interface read_FaixaHorariaConcessao { concessaoFaixaHoraria: FaixaHorariaConcessaoSchema }
export interface update_FaixaHorariaConcessao { data: { concessaoFaixaHoraria_Alterar: SchemaInterface }}
export interface delete_FaixaHorariaConcessao { data: { concessaoFaixaHoraria_Excluir: SchemaInterface }}

export abstract class FaixaHorariaConcessaoData {
    abstract createFaixaHorariaConcessao(site: FaixaHorariaConcessao): Observable<create_FaixaHorariaConcessao>;
    abstract readFaixaHorariaConcessaos(order?: FaixaHorariaSort, where?: FaixaHorariaFilter): Observable<read_FaixaHorariaConcessao>;
    abstract updateFaixaHorariaConcessao(site: FaixaHorariaConcessao): Observable<update_FaixaHorariaConcessao>;
    abstract deleteFaixaHorariaConcessao(id: number): Observable<delete_FaixaHorariaConcessao>;
}