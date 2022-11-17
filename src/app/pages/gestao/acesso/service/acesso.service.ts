import { Injectable } from '@angular/core';
import { of as ObservableOf } from 'rxjs';

import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';
import { GestaoAcessoData, GestaoAcessoFilter, GestaoAcessoSort, read_GestaoAcesso, Report } from 'src/app/@core/data/gestao-acesso';
import { GestaoAcessoSchema } from './acesso.schema';

@Injectable({
    providedIn: 'root'
})
export class GestaoAcessoService extends GestaoAcessoData {

    constructor(private graphQL: GenericGraphQL) {
        super();
     }

    readGestaoAcessos() {
        const variables = { ... this.graphQL.session };
        return this.graphQL.query<read_GestaoAcesso>(GestaoAcessoSchema.read_Gestao_Informacao, variables);
    }

    getReports(estilo: string) {
        const report: Report[] = [
            {
                codigo: "R1EA-1001",
                estilo: "Simples",
                informacoes: "Data/Hora - Nome - Documento - Central - Cartão - Site Code - Área - Bloqueio"
            },
            {
                codigo: "R1EA-1002",
                estilo: "Simples",
                informacoes: "Data/Hora - Nome - Matrícula - Central - Cartão - Site Code - Área - Bloqueio"
            },
            {
                codigo: "R1EA-1003",
                estilo: "Simples",
                informacoes: "Data/Hora - Nome - Contrato - Central - Cartão - Site Code - Área - Bloqueio"
            },
            {
                codigo: "R1EA-1004",
                estilo: "Simples",
                informacoes: "Data/Hora - Grupo - Nome - Documento - Central - Cartão - Site Code - Área - Bloqueio"
            },
            {
                codigo: "R1EA-1005",
                estilo: "Simples",
                informacoes: "Data/Hora - Nome - Documento - Empresa - Cartão - Site Code - Direção - Área"
            },
            {
                codigo: "R2EA-1001",
                estilo: "Agrupado",
                informacoes: "Data/Hora - Nome - Documento - Central - Cartão - Site Code - Área - Bloqueio / (Primeiro e Último Registro)"
            },
            {
                codigo: "R2EA-1002",
                estilo: "Agrupado",
                informacoes: "Data/Hora - Nome - Matrícula - Central - Cartão - Site Code - Área - Bloqueio / (Primeiro e Último Registro)"
            },
            {
                codigo: "R2EA-1003",
                estilo: "Agrupado",
                informacoes: "Data/Hora - Nome - Contrato - Central - Cartão - Site Code - Área - Bloqueio / (Primeiro e Último Registro)"
            },
            {
                codigo: "R2EA-1004",
                estilo: "Agrupado",
                informacoes: "Data/Hora - Nome - Grupo - Documento - Central - Cartão - Site Code / (Somente Primeiro Registro)"
            },
            {
                codigo: "R2EA-1005",
                estilo: "Agrupado",
                informacoes: "Data/Hora - Nome - Grupo - Matrícula - Central - Cartão - Site Code / (Somente Primeiro Registro)"
            },
            {
                codigo: "R2EA-1006",
                estilo: "Agrupado",
                informacoes: "Data/Hora - Nome - Grupo - Contrato - Central - Cartão - Site Code / (Somente Primeiro Registro)"
            }];
        
        return ObservableOf(report.filter(rpt => rpt.estilo == estilo));
    }

}