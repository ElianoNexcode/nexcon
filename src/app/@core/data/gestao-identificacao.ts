import { Observable } from 'rxjs';
import { FilterInput, SchemaInterface, SortOperationKind } from '../api/generic-graphql';

export interface Report {
    codigo: string,
    estilo: string
    informacoes: string
}

export interface GestaoIdentificacao {
    id?: number
}

export interface GestaoIdentificacaoSort {
    id?: SortOperationKind
}

export interface GestaoIdentificacaoFilter {
    id?: FilterInput
}

export interface GestaoRelatorioGrafico {
    campo: string
    diaHora: string
    valor: number
}

export interface GestaoRelatorioConsolidado {
    campo: string
    campo1: number
    campo2: number
    campo3: number
    campo4: number
    campo5: number
    campo6: number
    campo7: number
    campo8: number
    campo9: number
    campo10: number
    campo11: number
    campo12: number
    campo13: number
    campo14: number
    campo15: number
    campo16: number
    campo17: number
    campo18: number
    campo19: number
    campo20: number
    campo21: number
    campo22: number
    campo23: number
    campo24: number
    campo25: number
    campo26: number
    campo27: number
    campo28: number
    campo29: number
    campo30: number
    campo31: number
}

export interface GestaoRelatorioGraficoFilter {
    agrupamento?: FilterInput
    tipoRegistro?: FilterInput
    identificacaoTipo?: FilterInput
    identificacaoLocalTipo?: FilterInput
    identificacaoLocalNome?: FilterInput
    identificacaoOperadorNome?: FilterInput
    siteNome?: FilterInput
    pessoaTipo?: FilterInput
    pessoaNome?: FilterInput
    pessoaDocNumero?: FilterInput
    pessoaGrupo?: FilterInput
    pessoaReparticao?: FilterInput
    pessoaComplemento1?: FilterInput
    pessoaComplemento2?: FilterInput
    pessoaComplemento3?: FilterInput
    pessoaComplemento4?: FilterInput
    veiculoTipo?: FilterInput
    veiculoClasse?: FilterInput
    veiculoPlaca?: FilterInput
    veiculoModelo?: FilterInput
    veiculoCor?: FilterInput
    veiculoGrupo?: FilterInput
    veiculoCaracteristica?: FilterInput
    veiculoComplemento1?: FilterInput
    veiculoComplemento2?: FilterInput
    veiculoComplemento3?: FilterInput
    veiculoComplemento4?: FilterInput
    visitadoNome?: FilterInput
    visitadoUnidadeNome?: FilterInput
    visitadoCentroCusto?: FilterInput
    autorizanteNome?: FilterInput
    estacionamentoNome?: FilterInput
    garagemVaga?: FilterInput
    areaReservadaNome?: FilterInput
    motivo?: FilterInput
    identificador?: FilterInput
    observacao?: FilterInput
    valorIdentico?: FilterInput
    ordenacao?: FilterInput
    periodo?: FilterInput
    periodoInicial?: FilterInput
    periodoFinal?: FilterInput
}

export interface GestaoRelatorioGraficoSchema extends SchemaInterface {
    totalCount: number;
    nodes: GestaoRelatorioGrafico[];
}

export interface GestaoRelatorioConsolidadoSchema extends SchemaInterface {
    totalCount: number;
    nodes: GestaoRelatorioConsolidado[];
}

export interface GestaoIdentificacaoSchema extends SchemaInterface {
    nodes: GestaoIdentificacao[]
}

export interface read_GestaoIdentificacao { grupoPessoa: GestaoIdentificacaoSchema }
export interface read_GestaoRelatorioGrafico { gestaoRelatorioGrafico: GestaoRelatorioGraficoSchema }
export interface read_GestaoRelatorioConsolidado { gestaoRelatorioConsolidado: GestaoRelatorioConsolidadoSchema }

export abstract class GestaoIdentificacaoData {
    abstract readGestaoIdentificacaos(order?: GestaoIdentificacaoSort, where?: GestaoIdentificacaoFilter): Observable<read_GestaoIdentificacao>;
    abstract getRelatorioGrafico(filtros: any, modeloRelatorio: string): Observable<read_GestaoRelatorioGrafico>;
    abstract getRelatorioConsolidado(filtros: any, modeloRelatorio: string): Observable<read_GestaoRelatorioConsolidado>;
    abstract getReports(identificacaoTipo: string, estilo: string): Observable<Report[]>;
}