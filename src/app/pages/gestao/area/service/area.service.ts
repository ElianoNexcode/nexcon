import { Injectable } from '@angular/core';
import { of as ObservableOf } from 'rxjs';

import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';
import { GestaoAreaData, read_GestaoArea, Report } from 'src/app/@core/data/gestao-area';
import { GestaoAreaSchema } from './area.schema';

@Injectable({
    providedIn: 'root'
})
export class GestaoAreaService extends GestaoAreaData {

    constructor(private graphQL: GenericGraphQL) {
        super();
     }

    readGestaoAreas() {
        const variables = { ... this.graphQL.session };
        return this.graphQL.query<read_GestaoArea>(GestaoAreaSchema.read_Gestao_Informacao, variables);
    }

    getReports(estilo: string) {
        const report: Report[] = [
            {
                codigo: "R1AR-1001",
                estilo: "Simples",
                informacoes: "Cartão - Site Code - Área"
            },
            {
                codigo: "R1AR-1002",
                estilo: "Simples",
                informacoes: "Nome - Central - Cargo - Documento - Cartão - Site Code - Área"
            },
            {
                codigo: "R1AR-1003",
                estilo: "Simples",
                informacoes: "Grupo - Nome - Cargo - Doc/Mat/Ctr - Cartão - Site Code - Área"
            }];
        
        return ObservableOf(report.filter(rpt => rpt.estilo == estilo));
    }

}