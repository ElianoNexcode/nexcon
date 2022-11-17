import { Injectable } from '@angular/core';
import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';

import { EstacionamentoVagaSchema } from 'src/app/pages/reparticao/estacionamento/service/estacionamento.schema';
import { EstacionamentoVagaData, 
         EstacionamentoVaga, 
         EstacionamentoVagaSort,
         EstacionamentoVagaFilter,
         create_EstacionamentoVaga, 
         read_EstacionamentoVaga, 
         update_EstacionamentoVaga, 
         delete_EstacionamentoVaga} from 'src/app/@core/data/reparticao-vaga-estacionamento';
         
@Injectable()
export class EstacionamentoVagaService extends EstacionamentoVagaData {

    constructor(private graphQL: GenericGraphQL) {
        super();
    }

    createEstacionamentoVaga(estacionamentoVaga: EstacionamentoVaga) {
        const variables = { estacionamentoVaga: { ... estacionamentoVaga }, ... this.graphQL.session};
        return this.graphQL.mutation<create_EstacionamentoVaga>(EstacionamentoVagaSchema.create_EstacionamentoVaga, variables)
    }

    readEstacionamentoVagas(order_by?: EstacionamentoVagaSort, where?: EstacionamentoVagaFilter) {
        const variables = { ... this.graphQL.session, ... {order: order_by}, ... {where: where} }
        return this.graphQL.query<read_EstacionamentoVaga>(EstacionamentoVagaSchema.get_EstacionamentoVaga, variables);
    }

    readEstacionamentoVagasRelat(order_by?: EstacionamentoVagaSort, where?: EstacionamentoVagaFilter) {
        const variables = { ... this.graphQL.session, ... {order: order_by}, ... {where: where} }
        return this.graphQL.query<read_EstacionamentoVaga>(EstacionamentoVagaSchema.get_EstacionamentoVagaRelat, variables);
    }

    updateEstacionamentoVaga(estacionamentoVaga: EstacionamentoVaga) {
        const EstacionamentoVagaInput = { estacionamentoVaga: { ... estacionamentoVaga} , ...this.graphQL.session}
        return this.graphQL.mutation<update_EstacionamentoVaga>(EstacionamentoVagaSchema.update_EstacionamentoVaga, EstacionamentoVagaInput);
    }

    deleteEstacionamentoVaga(id: number) {
        return this.graphQL.mutation<delete_EstacionamentoVaga>(EstacionamentoVagaSchema.delete_EstacionamentoVaga, { id: id , ...this.graphQL.session} )
    }
}