import { Injectable } from '@angular/core';
import { of as ObservableOf } from 'rxjs';

import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';
import { GestaoOperacaoData, GestaoOperacaoFilter, GestaoOperacaoSort, read_GestaoOperacao, Report } from 'src/app/@core/data/gestao-operacao';
import { GestaoOperacaoSchema } from './operacao.schema';

@Injectable({
    providedIn: 'root'
})
export class GestaoOperacaoService extends GestaoOperacaoData {

    constructor(private graphQL: GenericGraphQL) {
        super();
     }

    readGestaoOperacaos() {
        const variables = { ... this.graphQL.session };
        return this.graphQL.query<read_GestaoOperacao>(GestaoOperacaoSchema.read_Gestao_Informacao, variables);
    }

    getReports(estilo: string) {
        var report: Report[] = [
            {
                codigo: "R1LO-1001",
                estilo: "Simples",
                informacoes: "Data/Hora - Operador - Nível de Operação - Sistema - Evento - Operação"
            },
            {
                codigo: "R1LO-1002",
                estilo: "Simples",
                informacoes: "Data/Hora - Operador - Sistema - Evento - Descrição"
            }];
        
        return ObservableOf(report.filter(rpt => rpt.estilo == estilo));
    }

}