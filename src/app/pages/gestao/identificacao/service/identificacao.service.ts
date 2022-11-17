import { Injectable } from '@angular/core';
import { of as ObservableOf } from 'rxjs';

import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';
import { GestaoIdentificacaoData,
         read_GestaoIdentificacao,
         read_GestaoRelatorioConsolidado,
         read_GestaoRelatorioGrafico,
         Report } from 'src/app/@core/data/gestao-identificacao';
import { FiltroIdentificacao } from 'src/app/@core/enum';
import { GestaoIdentificacaoSchema } from './identificacao.schema';



@Injectable({
    providedIn: 'root'
})
export class GestaoIdentifiacaoService extends GestaoIdentificacaoData {

    constructor(private graphQL: GenericGraphQL) {
        super();
     }

    readGestaoIdentificacaos() {
        const variables = { ... this.graphQL.session };
        return this.graphQL.query<read_GestaoIdentificacao>(GestaoIdentificacaoSchema.read_Gestao_Informacao, variables);
    }

    getRelatorioGrafico(filtros: any, modeloRelatorio: string) {
        const variables = { ... this.graphQL.session, ... {filtros: filtros}, ... {modeloRelatorio: modeloRelatorio} };
        return this.graphQL.query<read_GestaoRelatorioGrafico>(GestaoIdentificacaoSchema.getRelatorioGrafico, variables);
    }

    getRelatorioConsolidado(filtros: any, modeloRelatorio: string) {
        const variables = { ... this.graphQL.session, ... {filtros: filtros}, ... {modeloRelatorio: modeloRelatorio} };
        return this.graphQL.query<read_GestaoRelatorioConsolidado>(GestaoIdentificacaoSchema.getRelatorioConsolidado, variables);
    }

    getReports(relatorioTipo: string , estilo: string) {

        var report: Report[];


        if(relatorioTipo == "jr4lCO2Oc0"){

            report = [

                {
                    codigo: "R1ID-1001",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Grupo - Empresa - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1002",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Grupo - Identificador - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1003",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Identificador - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1004",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Área Visitada - Autorizante"
                },
                {
                    codigo: "R1ID-1005",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Área Visitada - Motivo"
                },
                {
                    codigo: "R1ID-1006",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Área Visitada - Recepção"
                },
                {
                    codigo: "R1ID-1007",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Área Visitada - Operador"
                },
                {
                    codigo: "R1ID-1008",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Área Visitada - Centro Custo"
                },
                {
                    codigo: "R1ID-1009",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Complemento 1 - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1010",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Complemento 2 - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1011",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Complemento 3 - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1012",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Complemento 4 - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1013",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Veículo - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1014",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Veículo - Pessoa Visitada - Estacionamento - Vaga"
                },
                {
                    codigo: "R1ID-1015",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Veículo - Área Visitada - Estacionamento - Vaga"
                },
                {
                    codigo: "R1ID-1016",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Observação"
                },
                {
                    codigo: "R1ID-1017",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Complemento 1 - Complemento 2 - Complemento 3 - Complemento 4"
                },
                {
                    codigo: "R1ID-1018",
                    estilo: "Simples",
                    informacoes: "Identificação - Recepção - Identificador - Nome - Empresa - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1019",
                    estilo: "Simples",
                    informacoes: "Identificação - Recepção - Motivo - Nome - Empresa - Pessoa Visitada"
                },
                {
                    codigo: "R1ID-1020",
                    estilo: "Simples",
                    informacoes: "Identificação - Recepção - Operador - Identificador - Motivo - Nome - Pessoa Visitada"
                },
                {
                    codigo: "R1ID-1021",
                    estilo: "Simples",
                    informacoes: "Identificação - Recepção - Operador - Identificador - Nome - Veículo - Pessoa Visitada"
                },
                {
                    codigo: "R1ID-1022",
                    estilo: "Simples",
                    informacoes: "Dados da Identificação - Dados do Visitante - Dados do Visitado - Dados da Visita"
                }];

        } else if (relatorioTipo == "Vz3eGqB+xk") {

            report = [

                {
                    codigo: "R1ID-1001",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Grupo - Empresa - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1002",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Grupo - Identificador - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1003",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Identificador - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1004",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Área Visitada - Autorizante"
                },
                {
                    codigo: "R1ID-1005",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Área Visitada - Motivo"
                },
                {
                    codigo: "R1ID-1006",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Área Visitada - Recepção"
                },
                {
                    codigo: "R1ID-1007",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Área Visitada - Operador"
                },
                {
                    codigo: "R1ID-1008",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Área Visitada - Centro Custo"
                },
                {
                    codigo: "R1ID-1009",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Complemento 1 - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1010",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Complemento 2 - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1011",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Complemento 3 - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1012",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Complemento 4 - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1013",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Veículo - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1014",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Veículo - Pessoa Visitada - Estacionamento - Vaga"
                },
                {
                    codigo: "R1ID-1015",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Veículo - Área Visitada - Estacionamento - Vaga"
                },
                {
                    codigo: "R1ID-1016",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Observação"
                },
                {
                    codigo: "R1ID-1017",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Complemento 1 - Complemento 2 - Complemento 3 - Complemento 4"
                },
                {
                    codigo: "R1ID-1018",
                    estilo: "Simples",
                    informacoes: "Identificação - Recepção - Identificador - Nome - Empresa - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1019",
                    estilo: "Simples",
                    informacoes: "Identificação - Recepção - Motivo - Nome - Empresa - Pessoa Visitada"
                },
                {
                    codigo: "R1ID-1020",
                    estilo: "Simples",
                    informacoes: "Identificação - Recepção - Operador - Identificador - Motivo - Nome - Pessoa Visitada"
                },
                {
                    codigo: "R1ID-1021",
                    estilo: "Simples",
                    informacoes: "Identificação - Recepção - Operador - Identificador - Nome - Veículo - Pessoa Visitada"
                },
                {
                    codigo: "R1ID-1022",
                    estilo: "Simples",
                    informacoes: "Dados da Identificação - Dados do Visitante - Dados do Visitado - Dados da Visita"
                },
                {
                    codigo: "R1ID-2001",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Grupo - Empresa - Pessoa Visitada - Área Visitada - Expiração"
                }]
        } else if (relatorioTipo == "QRDlsnoUrk") {
            report = [
                {
                    codigo: "R1ID-1001",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Grupo - Empresa - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1002",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Grupo - Identificador - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1003",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Identificador - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1004",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Área Visitada - Autorizante"
                },
                {
                    codigo: "R1ID-1005",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Área Visitada - Motivo"
                },
                {
                    codigo: "R1ID-1006",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Área Visitada - Recepção"
                },
                {
                    codigo: "R1ID-1007",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Área Visitada - Operador"
                },
                {
                    codigo: "R1ID-1008",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Área Visitada - Centro Custo"
                },
                {
                    codigo: "R1ID-1009",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Complemento 1 - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1010",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Complemento 2 - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1011",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Complemento 3 - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1012",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Complemento 4 - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1013",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Veículo - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1014",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Veículo - Pessoa Visitada - Estacionamento - Vaga"
                },
                {
                    codigo: "R1ID-1015",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Veículo - Área Visitada - Estacionamento - Vaga"
                },
                {
                    codigo: "R1ID-1016",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Observação"
                },
                {
                    codigo: "R1ID-1017",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Complemento 1 - Complemento 2 - Complemento 3 - Complemento 4"
                },
                {
                    codigo: "R1ID-1018",
                    estilo: "Simples",
                    informacoes: "Identificação - Recepção - Identificador - Nome - Empresa - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1019",
                    estilo: "Simples",
                    informacoes: "Identificação - Recepção - Motivo - Nome - Empresa - Pessoa Visitada"
                },
                {
                    codigo: "R1ID-1020",
                    estilo: "Simples",
                    informacoes: "Identificação - Recepção - Operador - Identificador - Motivo - Nome - Pessoa Visitada"
                },
                {
                    codigo: "R1ID-1021",
                    estilo: "Simples",
                    informacoes: "Identificação - Recepção - Operador - Identificador - Nome - Veículo - Pessoa Visitada"
                },
                {
                    codigo: "R1ID-1022",
                    estilo: "Simples",
                    informacoes: "Dados da Identificação - Dados do Visitante - Dados do Visitado - Dados da Visita"
                },
                {
                    codigo: "R1ID-3001",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Grupo - Empresa - Pessoa Visitada - Área Visitada - Suspensão"
                }]

        } else if (relatorioTipo == "3IICDLaBZU") {
            report = [
                {
                    codigo: "R1ID-1001",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Grupo - Empresa - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1002",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Grupo - Identificador - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1003",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Identificador - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1004",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Área Visitada - Autorizante"
                },
                {
                    codigo: "R1ID-1005",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Área Visitada - Motivo"
                },
                {
                    codigo: "R1ID-1006",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Área Visitada - Recepção"
                },
                {
                    codigo: "R1ID-1007",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Área Visitada - Operador"
                },
                {
                    codigo: "R1ID-1008",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Área Visitada - Centro Custo"
                },
                {
                    codigo: "R1ID-1009",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Complemento 1 - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1010",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Complemento 2 - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1011",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Complemento 3 - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1012",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Complemento 4 - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1013",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Veículo - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1014",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Veículo - Pessoa Visitada - Estacionamento - Vaga"
                },
                {
                    codigo: "R1ID-1015",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Veículo - Área Visitada - Estacionamento - Vaga"
                },
                {
                    codigo: "R1ID-1016",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Observação"
                },
                {
                    codigo: "R1ID-1017",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Complemento 1 - Complemento 2 - Complemento 3 - Complemento 4"
                },
                {
                    codigo: "R1ID-1018",
                    estilo: "Simples",
                    informacoes: "Identificação - Recepção - Identificador - Nome - Empresa - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1019",
                    estilo: "Simples",
                    informacoes: "Identificação - Recepção - Motivo - Nome - Empresa - Pessoa Visitada"
                },
                {
                    codigo: "R1ID-1020",
                    estilo: "Simples",
                    informacoes: "Identificação - Recepção - Operador - Identificador - Motivo - Nome - Pessoa Visitada"
                },
                {
                    codigo: "R1ID-1021",
                    estilo: "Simples",
                    informacoes: "Identificação - Recepção - Operador - Identificador - Nome - Veículo - Pessoa Visitada"
                },
                {
                    codigo: "R1ID-1022",
                    estilo: "Simples",
                    informacoes: "Dados da Identificação - Dados do Visitante - Dados do Visitado - Dados da Visita"
                },
            ]
        } else if (relatorioTipo == "Zl7IgvPOpk") {
            report = [
                {
                    codigo: "R1ID-1001",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Grupo - Empresa - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1002",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Grupo - Identificador - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1003",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Identificador - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1004",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Área Visitada - Autorizante"
                },
                {
                    codigo: "R1ID-1005",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Área Visitada - Motivo"
                },
                {
                    codigo: "R1ID-1006",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Área Visitada - Recepção"
                },
                {
                    codigo: "R1ID-1007",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Área Visitada - Operador"
                },
                {
                    codigo: "R1ID-1008",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Área Visitada - Centro Custo"
                },
                {
                    codigo: "R1ID-1009",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Complemento 1 - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1010",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Complemento 2 - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1011",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Complemento 3 - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1012",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Complemento 4 - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1013",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Veículo - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1014",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Veículo - Pessoa Visitada - Estacionamento - Vaga"
                },
                {
                    codigo: "R1ID-1015",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Veículo - Área Visitada - Estacionamento - Vaga"
                },
                {
                    codigo: "R1ID-1016",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Observação"
                },
                {
                    codigo: "R1ID-1017",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Complemento 1 - Complemento 2 - Complemento 3 - Complemento 4"
                },
                {
                    codigo: "R1ID-1018",
                    estilo: "Simples",
                    informacoes: "Identificação - Recepção - Identificador - Nome - Empresa - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1019",
                    estilo: "Simples",
                    informacoes: "Identificação - Recepção - Motivo - Nome - Empresa - Pessoa Visitada"
                },
                {
                    codigo: "R1ID-1020",
                    estilo: "Simples",
                    informacoes: "Identificação - Recepção - Operador - Identificador - Motivo - Nome - Pessoa Visitada"
                },
                {
                    codigo: "R1ID-1021",
                    estilo: "Simples",
                    informacoes: "Identificação - Recepção - Operador - Identificador - Nome - Veículo - Pessoa Visitada"
                },
                {
                    codigo: "R1ID-1022",
                    estilo: "Simples",
                    informacoes: "Dados da Identificação - Dados do Visitante - Dados do Visitado - Dados da Visita"
                },
                {
                    codigo: "R1ID-4001",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Grupo - Empresa - Pessoa Visitada - Área Visitada - Cancelamento"
                },
            ]
        }else if (relatorioTipo == "qZTQiqA8/U") {
            report = [
                {
                    codigo: "R1ID-1001",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Grupo - Empresa - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1002",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Grupo - Identificador - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1003",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Identificador - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1004",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Área Visitada - Autorizante"
                },
                {
                    codigo: "R1ID-1005",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Área Visitada - Motivo"
                },
                {
                    codigo: "R1ID-1006",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Área Visitada - Recepção"
                },
                {
                    codigo: "R1ID-1007",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Área Visitada - Operador"
                },
                {
                    codigo: "R1ID-1008",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Área Visitada - Centro Custo"
                },
                {
                    codigo: "R1ID-1009",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Complemento 1 - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1010",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Complemento 2 - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1011",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Complemento 3 - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1012",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Complemento 4 - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1013",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Veículo - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1014",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Veículo - Pessoa Visitada - Estacionamento - Vaga"
                },
                {
                    codigo: "R1ID-1015",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Veículo - Área Visitada - Estacionamento - Vaga"
                },
                {
                    codigo: "R1ID-1016",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Observação"
                },
                {
                    codigo: "R1ID-1017",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Complemento 1 - Complemento 2 - Complemento 3 - Complemento 4"
                },
                {
                    codigo: "R1ID-1018",
                    estilo: "Simples",
                    informacoes: "Identificação - Recepção - Identificador - Nome - Empresa - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1019",
                    estilo: "Simples",
                    informacoes: "Identificação - Recepção - Motivo - Nome - Empresa - Pessoa Visitada"
                },
                {
                    codigo: "R1ID-1020",
                    estilo: "Simples",
                    informacoes: "Identificação - Recepção - Operador - Identificador - Motivo - Nome - Pessoa Visitada"
                },
                {
                    codigo: "R1ID-1021",
                    estilo: "Simples",
                    informacoes: "Identificação - Recepção - Operador - Identificador - Nome - Veículo - Pessoa Visitada"
                },
                {
                    codigo: "R1ID-1022",
                    estilo: "Simples",
                    informacoes: "Dados da Identificação - Dados do Visitante - Dados do Visitado - Dados da Visita"
                },
                {
                    codigo: "R1ID-4001",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Grupo - Empresa - Pessoa Visitada - Área Visitada - Encerramento"
                },
            ]
        }else if (relatorioTipo == "Yw9zuvFZJU") {
            report = [
                {
                    codigo: "R1ID-1001",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Grupo - Empresa - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1002",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Grupo - Identificador - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1003",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Identificador - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1004",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Área Visitada - Autorizante"
                },
                {
                    codigo: "R1ID-1005",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Área Visitada - Motivo"
                },
                {
                    codigo: "R1ID-1006",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Área Visitada - Recepção"
                },
                {
                    codigo: "R1ID-1007",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Área Visitada - Operador"
                },
                {
                    codigo: "R1ID-1008",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Área Visitada - Centro Custo"
                },
                {
                    codigo: "R1ID-1009",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Complemento 1 - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1010",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Complemento 2 - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1011",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Complemento 3 - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1012",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Complemento 4 - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1013",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Veículo - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1014",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Veículo - Pessoa Visitada - Estacionamento - Vaga"
                },
                {
                    codigo: "R1ID-1015",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Veículo - Área Visitada - Estacionamento - Vaga"
                },
                {
                    codigo: "R1ID-1016",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Empresa - Pessoa Visitada - Observação"
                },
                {
                    codigo: "R1ID-1017",
                    estilo: "Simples",
                    informacoes: "Identificação - Nome - Complemento 1 - Complemento 2 - Complemento 3 - Complemento 4"
                },
                {
                    codigo: "R1ID-1018",
                    estilo: "Simples",
                    informacoes: "Identificação - Recepção - Identificador - Nome - Empresa - Pessoa Visitada - Área Visitada"
                },
                {
                    codigo: "R1ID-1019",
                    estilo: "Simples",
                    informacoes: "Identificação - Recepção - Motivo - Nome - Empresa - Pessoa Visitada"
                },
                {
                    codigo: "R1ID-1020",
                    estilo: "Simples",
                    informacoes: "Identificação - Recepção - Operador - Identificador - Motivo - Nome - Pessoa Visitada"
                },
                {
                    codigo: "R1ID-1021",
                    estilo: "Simples",
                    informacoes: "Identificação - Recepção - Operador - Identificador - Nome - Veículo - Pessoa Visitada"
                },
                {
                    codigo: "R1ID-1022",
                    estilo: "Simples",
                    informacoes: "Dados da Identificação - Dados do Visitante - Dados do Visitado - Dados da Visita"
                }]
        }
            
        
        return ObservableOf(report.filter(rpt => rpt.estilo == estilo));
    }

}