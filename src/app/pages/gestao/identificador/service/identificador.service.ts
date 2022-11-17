import { Injectable } from '@angular/core';
import { of as ObservableOf } from 'rxjs';

import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';
import { GestaoIdentificadorData,
         read_GestaoIdentificador,
         Report } from 'src/app/@core/data/gestao-identificador';
import { GestaoIdentificadorSchema } from './identificador.schema';



@Injectable({
    providedIn: 'root'
})
export class GestaoIdentificadorService extends GestaoIdentificadorData {

    constructor(private graphQL: GenericGraphQL) {
        super();
     }

    readGestaoIdentificadors() {
        const variables = { ... this.graphQL.session };
        return this.graphQL.query<read_GestaoIdentificador>(GestaoIdentificadorSchema.read_Gestao_Informacao, variables);
    }

    getReports(estilo: string) {
        const report: Report[] = [
            {
                codigo: "R1CE-1001",
                estilo: "Simples",
                informacoes: "Cartão - Site Code - Data Expiração"
            },
            {
                codigo: "R1CE-1002",
                estilo: "Simples",
                informacoes: "Nome - Grupo - Documento - Cartão - Site Code - Data Expiração"
            },
            {
                codigo: "R1CE-1003",
                estilo: "Simples",
                informacoes: "Nome - Grupo - Matrícula - Cartão - Site Code - Data Expiração"
            },
            {
                codigo: "R1CE-1004",
                estilo: "Simples",
                informacoes: "Nome - Grupo - Contrato - Cartão - Site Code - Data Expiração"
            },
            {
                codigo: "R1CE-1005",
                estilo: "Simples",
                informacoes: "Grupo - Nome - Doc/Mat/Ctr - Cartão - Site Code - Data Expiração"
            }];
        
        return ObservableOf(report.filter(rpt => rpt.estilo == estilo));
    }

}