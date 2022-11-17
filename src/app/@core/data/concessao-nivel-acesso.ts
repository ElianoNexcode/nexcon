import { Observable } from 'rxjs';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';
import { FaixaHorariaConcessao, FaixaHorariasConcessao } from './concessao-faixa-horaria';
import { BloqueioDispositivo, BloqueiosDispositivo } from './dispositivo-bloqueio';
import { ElevadorDispositivo, ElevadoresDispositivo } from './dispositivo-elevador';
import { AreaReparticao, AreaReparticaoFilter } from './reparticao-area';
import { RecepcaoNivelAcesso } from './reparticao-recepcao';

export interface Areas  { 
    id?: number
    areaId?: number
    area?: AreaReparticao
    bloqueios?: BloqueiosDispositivo[]
    faixasHorarias?: FaixaHorariasConcessao[]
    elevadores?: ElevadoresDispositivo[]
}

export interface NivelAcessoConcessao{

    id?: number
    nome?: string
    tipo?: number
    areas?: Areas[]
    validadeInicial?: string
    validadeFinal?: string
    expansaoHoraInicial?: string
    expansaoHoraFinal?: string
    expansaoDataInicial?: string
    expansaoDataFinal?: string
    observacao?: string
    status?: boolean
    recepcoes?: RecepcaoNivelAcesso[]
}

export interface NivelAcessoSort {
    id?: SortOperationKind
    nome?: SortOperationKind
    tipo?: SortOperationKind
    validadeInicial?: SortOperationKind
    validadeFinal?: SortOperationKind
    expansaoHorariaInicial?: SortOperationKind
    expansaoDataFinal?: SortOperationKind
    observacao?: SortOperationKind
    status?: SortOperationKind
}

export interface NivelAcessoFilter{
    id?: FilterInput
    nome?: FilterInput
    tipo?: FilterInput
    areas?: { all: {area: AreaReparticaoFilter }}
    validadeInicial?: FilterInput
    validadeFinal?: FilterInput 
    expansaoHoraInicial?: FilterInput
    expansaoHoraFinal?: FilterInput 
    expansaoDataInicial?: FilterInput
    expansaoDataFinal?: FilterInput 
    observacao?: FilterInput 
    status?: FilterInput
}


export interface NivelAcessoConcessaoSchema extends SchemaInterface {
    nodes: NivelAcessoConcessao[]
    totalCount: number
}

export interface create_NivelAcessoConcessao { data: { concessaoNivelAcesso_Inserir: SchemaInterface }}
export interface read_NivelAcessoConcessao   { concessaoNivelAcesso: NivelAcessoConcessaoSchema}
export interface update_NivelAcessoConcessao { data: {concessaoNivelAcesso_Alterar: SchemaInterface}}
export interface delete_NivelAcessoConcessao { data: {concessaoNivelAcesso_Excluir: SchemaInterface}}
 
export abstract class NivelAcessoConcessaoData {

    abstract createNivelAcessoConcessao(site: NivelAcessoConcessao): Observable<create_NivelAcessoConcessao>;
    abstract readNivelAcessoConcessao(order?: NivelAcessoSort, where?: NivelAcessoFilter): Observable<read_NivelAcessoConcessao>;
    abstract readNivelAcessoConcessaoRelat(order?: NivelAcessoSort, where?: NivelAcessoFilter): Observable<read_NivelAcessoConcessao>;
    abstract updateNivelAcessoConcessao(site: NivelAcessoConcessao): Observable<update_NivelAcessoConcessao>;
    abstract deleteNivelAcessoConcessao(id: number): Observable<delete_NivelAcessoConcessao>;

}