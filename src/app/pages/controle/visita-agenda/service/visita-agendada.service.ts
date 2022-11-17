import { Injectable } from '@angular/core';
import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';

import { ControleVisitaAgendaSchema } from './visita-agendada.schema';
import { ControleVisitaAgendaData, 
         ControleVisitaAgendaFilter, 
         ControleVisitaAgendaSort, 
         read_ControleVisitaAgenda} from 'src/app/@core/data/controle-visita-agenda';

@Injectable()
export class ControleVisitaAgendaService extends ControleVisitaAgendaData {

    constructor(private graphQL: GenericGraphQL) {
        super();
    }

    readControleVisitaAgenda(order_by?: ControleVisitaAgendaSort, where?: ControleVisitaAgendaFilter, first?: number) {
        const variables = { ... this.graphQL.session, ... {order: order_by}, ... {where: where}, ... {first: first} }
        return this.graphQL.query<read_ControleVisitaAgenda>(ControleVisitaAgendaSchema.read_ControleVisitaAgenda, variables);
    }

}