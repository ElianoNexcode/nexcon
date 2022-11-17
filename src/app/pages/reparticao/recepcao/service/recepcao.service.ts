import { Injectable } from '@angular/core';
import { GenericGraphQL, SchemaInterface } from 'src/app/@core/api/generic-graphql';

import { RecepcaoSchema } from './recepcao.schema';
import { RecepcaoData, 
         RecepcaoReparticao, 
         create_RecepcaoReparticao, 
         read_RecepcaoReparticao, 
         update_RecepcaoReparticao, 
         delete_RecepcaoReparticao, 
         RecepcaoReparticaoSort,
         RecepcaoReparticaoFilter} from 'src/app/@core/data/reparticao-recepcao';

@Injectable()
export class RecepcaoService extends RecepcaoData {

    constructor(private graphQL: GenericGraphQL) {
        super();
    }

    createRecepcaoReparticao(recepcao: RecepcaoReparticao) {
        const variables = { recepcao: { ... recepcao }, ... this.graphQL.session};
        return this.graphQL.mutation<create_RecepcaoReparticao>(RecepcaoSchema.create_Recepcao, variables)
    }

    readRecepcaoReparticao(order?: RecepcaoReparticaoSort, where?: RecepcaoReparticaoFilter) {
        const variables = { ... this.graphQL.session, ... {order: order}, ... {where: where} };
        return this.graphQL.query<read_RecepcaoReparticao>(RecepcaoSchema.read_RecepcaoGrid, variables);
    }

    updateRecepcaoReparticao(recepcao: RecepcaoReparticao) {
        const variables = { recepcao: { ... recepcao}, ... this.graphQL.session }
        return this.graphQL.mutation<update_RecepcaoReparticao>(RecepcaoSchema.update_Recepcao, variables);
    }

    deleteRecepcaoReparticao(id: number) {
        return this.graphQL.mutation<delete_RecepcaoReparticao>(RecepcaoSchema.delete_Recepcao, {id: id, ... this.graphQL.session})
    }

}