import { Injectable } from '@angular/core';
import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';

import { TelefonesUteisComunicacaoSchema } from './telefones-uteis.schema';
import { TelefonesUteisComunicacaoData, 
         TelefonesUteisComunicacao, 
         TelefonesUteisComunicacaoSort,
         TelefonesUteisComunicacaoFilter,
         create_TelefonesUteisComunicacao, 
         read_TelefonesUteisComunicacao, 
         update_TelefonesUteisComunicacao, 
         delete_TelefonesUteisComunicacao} from 'src/app/@core/data/comunicacao-telefones-uteis';

@Injectable()
export class TelefonesUteisComunicacaoService extends TelefonesUteisComunicacaoData {

    constructor(private graphQL: GenericGraphQL) {
        super();
    }

    createTelefonesUteisComunicacao(telefonesUteis: TelefonesUteisComunicacao) {
        const variables = { telefonesUteis: { ... telefonesUteis }, ... this.graphQL.session};
        return this.graphQL.mutation<create_TelefonesUteisComunicacao>(TelefonesUteisComunicacaoSchema.create_TelefonesUteisComunicacao, variables)
    }

    readTelefonesUteisComunicacaos(order_by?: TelefonesUteisComunicacaoSort, where?: TelefonesUteisComunicacaoFilter, first?: number) {
        const variables = { ... this.graphQL.session, ... {order: order_by}, ... {where: where}, ... {first: first} }
        return this.graphQL.query<read_TelefonesUteisComunicacao>(TelefonesUteisComunicacaoSchema.read_TelefonesUteisComunicacao, variables);
    }

    updateTelefonesUteisComunicacao(telefonesUteis: TelefonesUteisComunicacao) {
        const telefonesUteisComunicacaoInput = { telefonesUteis: { ... telefonesUteis} , ...this.graphQL.session}
        return this.graphQL.mutation<update_TelefonesUteisComunicacao>(TelefonesUteisComunicacaoSchema.update_TelefonesUteisComunicacao, telefonesUteisComunicacaoInput);
    }

    deleteTelefonesUteisComunicacao(id: number) {
        return this.graphQL.mutation<delete_TelefonesUteisComunicacao>(TelefonesUteisComunicacaoSchema.delete_TelefonesUteisComunicacao, { id: id , ...this.graphQL.session} )
    }
}