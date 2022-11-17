import { Injectable } from '@angular/core';
import { of as ObservableOf } from 'rxjs';

import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';
import { GestaoSistemaData, GestaoSistemaFilter, GestaoSistemaSort, read_GestaoSistema, Report } from 'src/app/@core/data/gestao-sistema';
import { GestaoSistemaSchema } from './sistema.schema';

@Injectable({
    providedIn: 'root'
})
export class GestaoSistemaService extends GestaoSistemaData {

    constructor(private graphQL: GenericGraphQL) {
        super();
     }

    readGestaoSistemas() {
        const variables = { ... this.graphQL.session };
        return this.graphQL.query<read_GestaoSistema>(GestaoSistemaSchema.read_Gestao_Informacao, variables);
    }

    getReports(estilo: string) {
        const report: Report[] = [
            {
                codigo: "R1LS-1001",
                estilo: "Simples",
                informacoes: "Data/Hora - Sistema - Evento - Descrição"
            }];
        
        return ObservableOf(report.filter(rpt => rpt.estilo == estilo));
    }

}