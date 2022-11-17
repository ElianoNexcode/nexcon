import { Injectable } from '@angular/core';
import { GenericGraphQL, SortOperationKind } from 'src/app/@core/api/generic-graphql';

import { IdentificacaoControleSchema } from './identificacao.schema';

import { IdentificacaoControleData, 
         IdentificacaoControle, 
         IdentificacaoControleSort,
         IdentificacaoControleFilter,
         IdentificacaoControleArqFilter,
         create_IdentificacaoControle, 
         read_IdentificacaoControle, 
         update_IdentificacaoControle,
         read_IdentificacaoControleArq,
         filterSchema,
         suspend_IdentificacaoControle,
         cancel_IdentificacaoControle,
         end_IdentificacaoControle } from 'src/app/@core/data/controle-identificacao';

import { Identificacao } from 'src/app/@core/enum';

import { DateOperator } from 'src/app/@theme/components/miscellaneous/date-operator/date-operator';

@Injectable()
export class IdentificacaoControleService extends IdentificacaoControleData {

    dateOperator: DateOperator = new DateOperator();

    constructor(private graphQL: GenericGraphQL) {
        super();
    }

    createIdentificacaoControle(identificacaoControle: IdentificacaoControle) {
        const variables = { identificacao: { ... identificacaoControle }, ... this.graphQL.session};
        return this.graphQL.mutation<create_IdentificacaoControle>(IdentificacaoControleSchema.create_IdentificacaoControle, variables)
    }

    readIdentificacaoControles(order?: IdentificacaoControleSort, where?: IdentificacaoControleFilter, first?: number) {
        const variables = { ... this.graphQL.session, ... {order: order}, ... {where: where}, ... {first: first} }
        return this.graphQL.query<read_IdentificacaoControle>(IdentificacaoControleSchema.read_IdentificacaoControle, variables);
    }

    readIdentificacaoControlesArq(order?: IdentificacaoControleSort, where?: IdentificacaoControleArqFilter, first?: number) {
        const variables = { ... this.graphQL.session, ... {order: order}, ... {where: where}, ... {first: first} }
        return this.graphQL.query<read_IdentificacaoControleArq>(IdentificacaoControleSchema.read_IdentificacaoControleArq, variables);
    }

    readIdentificacaoControlesRelat(order?: IdentificacaoControleSort, where?: IdentificacaoControleFilter, first?: number) {
        const variables = { ... this.graphQL.session, ... {order: order}, ... {where: where}, ... {first: first} }
        return this.graphQL.query<read_IdentificacaoControle>(IdentificacaoControleSchema.read_IdentificacaoControleRelat, variables);
    }

    readIdentificacaoControlesArqRelat(order?: IdentificacaoControleSort, where?: IdentificacaoControleArqFilter, first?: number) {
        const variables = { ... this.graphQL.session, ... {order: order}, ... {where: where}, ... {first: first} }
        return this.graphQL.query<read_IdentificacaoControleArq>(IdentificacaoControleSchema.read_IdentificacaoControleArqRelat, variables);
    }

    updateIdentificacaoControle(identificacaoControle: IdentificacaoControle) {
        const variables = { identificacao: { ... identificacaoControle} , ...this.graphQL.session}
        return this.graphQL.mutation<update_IdentificacaoControle>(IdentificacaoControleSchema.update_IdentificacaoControle, variables);
    }

    suspendIdentificacaoControle(id: number, suspensoOperadorId: number, suspensoOperadorNome: string, suspensoObservacao: string) {
        const variables = { identificacao: { id: id, 
                                             suspensoOperadorID: suspensoOperadorId, 
                                             suspensoOperadorNome: suspensoOperadorNome,
                                             suspensoObservacao: suspensoObservacao},
                                             ...this.graphQL.session }
        return this.graphQL.mutation<suspend_IdentificacaoControle>(IdentificacaoControleSchema.suspend_IdentificacaoControle, variables);
    }

    cancelIdentificacaoControle(id: number, statusFinalPessoaId: number, statusFinalPessoaNome: string, statusFinalLocal: string, statusFinalObservacao: string){
        const variables = { identificacao: { id: id,
                                             statusFinalPessoaId: statusFinalPessoaId,
                                             statusFinalPessoaNome: statusFinalPessoaNome,
                                             statusFinalLocal: statusFinalLocal,
                                             statusFinalObservacao: statusFinalObservacao },
                                             ...this.graphQL.session }
        return this.graphQL.mutation<cancel_IdentificacaoControle>(IdentificacaoControleSchema.cancel_IdentificacaoControle, variables);
    }

    endIdentificacaoControle(id: number, statusFinalPessoaId: number, statusFinalPessoaNome: string, statusFinalLocal: string, statusFinalObservacao: string){
        const variables = { identificacao: { id: id,
                                             statusFinalPessoaId: statusFinalPessoaId,
                                             statusFinalPessoaNome: statusFinalPessoaNome,
                                             statusFinalLocal: statusFinalLocal,
                                             statusFinalObservacao: statusFinalObservacao },
                                             ...this.graphQL.session }
        return this.graphQL.mutation<end_IdentificacaoControle>(IdentificacaoControleSchema.end_IdentificacaoControle, variables);
    }

    getFilterSchema(periodo: string, siteId: number, operadorId: number): filterSchema {
        let filterSchema: filterSchema = { filter: undefined, 
                                           filterArq: undefined,
                                           order: {},
                                           first: undefined,
                                           title: null };

        filterSchema.order = {identificacaoDataHora: SortOperationKind.DESC};

        const date: Date = new Date();
        const timeAtual: string = date.toTimeString().substr(0, 5);

        const dataAtual: string = this.dateOperator.formatDate(date.toLocaleDateString("pt-br")).dateFormated + " " + timeAtual + " -00:00";
        const dataInicioDia: string = this.dateOperator.formatDate(date.toLocaleDateString("pt-br")).dateFormated + " 00:00:00 -00:00";
        const dataFinalDia: string = this.dateOperator.formatDate(date.toLocaleDateString("pt-br")).dateFormated + " 23:59:59 -00:00";

        let dataInicioSemana: string;
        let dataFinalSemana: string;

        const dayOfWeek: number = date.getDay();
        switch (dayOfWeek) {
            case 1:
                date.setDate(date.getDate() - 1);

                break;
            case 2:
                date.setDate(date.getDate() - 2);

                break;
            case 3:
                date.setDate(date.getDate() - 3);

                break;
            case 4:
                date.setDate(date.getDate() - 4);

                break;
            case 5:
                date.setDate(date.getDate() - 5);

                break;
            case 6:
                date.setDate(date.getDate() - 6);
                
                break;
        };

        dataInicioSemana = this.dateOperator.formatDate(date.toLocaleDateString("pt-br")).dateFormated + " 00:00:00 -00:00";

        date.setDate(date.getDate() + 7);
        dataFinalSemana = this.dateOperator.formatDate(date.toLocaleDateString("pt-br")).dateFormated + " 23:59:59 -00:00";

        date.setDate(date.getDate() - (date.getDate() - 1))
        const dataInicioMes: string = this.dateOperator.formatDate(date.toLocaleDateString("pt-br")).dateFormated + " 00:00:00 -00:00";        

        date.setMonth(date.getMonth() + 1);
        date.setDate(date.getDate() - 1);
        const dataFinalMes: string = this.dateOperator.formatDate(date.toLocaleDateString("pt-br")).dateFormated + " 23:59:59 -00:00";

        switch (periodo) {
            case Identificacao.recente:
                filterSchema.title = "Identificação (Recente)";
                filterSchema.filter = { identificacaoOperadorId: {eq: operadorId},
                                        suspensoDataHora: {eq: null} };
                filterSchema.order = {identificacaoDataHora: SortOperationKind.DESC};
                filterSchema.first = 1;
                
                break;
            case Identificacao.vigente:
                filterSchema.title = "Identificação (Vigentes)";
                filterSchema.filter = {suspensoDataHora: {eq: null}};
                filterSchema.order = {identificacaoDataHora: SortOperationKind.DESC};
                filterSchema.first = 128;
        
                break;
            case Identificacao.expirada:
                filterSchema.title = "Identificação (Expiradas)";
                filterSchema.filter = {suspensoDataHora: {eq: null},
                                       identificacaoValidadeFinal: {lt: dataAtual}};
                filterSchema.order = {identificacaoDataHora: SortOperationKind.DESC};
                filterSchema.first = 128;

                break;
            case Identificacao.suspensa:
                filterSchema.title = "Identificação (Suspensas)";
                filterSchema.order = {suspensoDataHora: SortOperationKind.DESC};
                filterSchema.filter = {suspensoDataHora: {not: null}};
                filterSchema.first = 128;

                break;
            case Identificacao.provisoria:
                filterSchema.title  = "Identificação (Provisórias)";
                filterSchema.order = {identificacaoDataHora: SortOperationKind.DESC};
                filterSchema.filter = {pessoaTipo: {eq: 1},
                                       suspensoDataHora: {eq: null}};
                filterSchema.first = 128;

                break;
            case Identificacao.cancelada_dia:
                filterSchema.title = "Identificação (Canceladas do Dia)";
                filterSchema.order = {statusFinalDataHora: SortOperationKind.DESC};
                filterSchema.filter = null;
                filterSchema.filterArq = {statusFinal: {eq: 2},
                                          statusFinalDataHora: {gte: dataInicioDia,
                                                                lte: dataFinalDia}};
                filterSchema.first = 128;

                break;
            case Identificacao.cancelada_semana:
                filterSchema.title = "Identificação (Canceladas da Semana)";
                filterSchema.order = {statusFinalDataHora: SortOperationKind.DESC};
                filterSchema.filter = null;
                filterSchema.filterArq = {statusFinal: {eq: 2},
                                          statusFinalDataHora: {gte: dataInicioSemana, 
                                                                lte: dataFinalSemana}};
                filterSchema.first = 128;   

                break;
            case Identificacao.cancelada_mes:
                filterSchema.title = "Identificação (Canceladas do Mês)";
                filterSchema.order = {statusFinalDataHora: SortOperationKind.DESC};
                filterSchema.filter = null;
                filterSchema.filterArq = {statusFinal: {eq: 2},
                                          statusFinalDataHora: {gte: dataInicioMes, 
                                                                lte: dataFinalMes}};
                filterSchema.first = 128;

                break;
            case Identificacao.encerrada_dia:
                filterSchema.title = "Identificação (Encerradas do Dia)";
                filterSchema.order = {statusFinalDataHora: SortOperationKind.DESC};
                filterSchema.filter = null;
                filterSchema.filterArq = {statusFinal: {eq: 1},
                                          statusFinalDataHora: {gte: dataInicioDia, 
                                                                lte: dataFinalDia}};
                filterSchema.first = 128;
        
                break;
            case Identificacao.encerrada_semana:
                filterSchema.title = "Identificação (Encerradas da Semana)";
                filterSchema.order = {statusFinalDataHora: SortOperationKind.DESC};
                filterSchema.filter = null;
                filterSchema.filterArq = {statusFinal: {eq: 1},
                                          statusFinalDataHora: {gte: dataInicioSemana, 
                                                                lte: dataFinalSemana}};
                filterSchema.first = 128;
        
                break;
            case Identificacao.encerrada_mes:
                filterSchema.title = "Identificação (Encerradas do Mês)";
                filterSchema.order = {statusFinalDataHora: SortOperationKind.DESC};
                filterSchema.filter = null;
                filterSchema.filterArq = {statusFinal: {eq: 1},
                                          statusFinalDataHora: {gte: dataInicioMes, 
                                                                lte: dataFinalMes}};
                filterSchema.first = 128;
        
                break;
            case Identificacao.historico_dia:
                filterSchema.title = "Identificação (Histórico do Dia)";
                filterSchema.order = {identificacaoDataHora: SortOperationKind.DESC};
                filterSchema.filter = null;
                filterSchema.filterArq = {identificacaoDataHora: {gte: dataInicioDia, 
                                                                  lte: dataFinalDia}};
                filterSchema.first = 128;
        
                break;
            case Identificacao.historico_semana:
                filterSchema.title = "Identificação (Histórico da Semana)";
                filterSchema.order = {identificacaoDataHora: SortOperationKind.DESC};
                filterSchema.filter = null;
                filterSchema.filterArq = {identificacaoDataHora: {gte: dataInicioSemana, 
                                                                  lte: dataFinalSemana}};
                filterSchema.first = 128;
        
                break;
            case Identificacao.historico_mes:
                filterSchema.title = "Identificação (Histórico do Mês)";
                filterSchema.order = {identificacaoDataHora: SortOperationKind.DESC};
                filterSchema.filter = null;
                filterSchema.filterArq = {identificacaoDataHora: {gte: dataInicioMes, 
                                                                  lte: dataFinalMes}};
                filterSchema.first = 128;
        
                break;    
        }

        if(filterSchema.filter) filterSchema.filter = {siteId: {eq: siteId}};
        if(filterSchema.filterArq) filterSchema.filterArq = {siteId: {eq: siteId}};

        return filterSchema;
    }


}