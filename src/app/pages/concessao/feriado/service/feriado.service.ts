import { Injectable } from '@angular/core';
import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';

import { FeriadoConcessaoSchema } from './feriado.schema';
import { FeriadoConcessaoData, 
         FeriadoConcessao,
         FeriadoSort,
         FeriadoFilter,
         create_FeriadoConcessao, 
         read_FeriadoConcessao, 
         update_FeriadoConcessao, 
         delete_FeriadoConcessao } from 'src/app/@core/data/concessao-feriado';

@Injectable()
export class FeriadoConcessaoService extends FeriadoConcessaoData {

    constructor(private graphQL: GenericGraphQL) {
        super();
    }

    createFeriadoConcessao(feriado: FeriadoConcessao) {
        const variables = { feriado: { ... feriado }, ... this.graphQL.session};
        return this.graphQL.mutation<create_FeriadoConcessao>(FeriadoConcessaoSchema.create_FeriadoConcessao, variables)
    }

    readFeriadoConcessaos(order_by?: FeriadoSort, where?: FeriadoFilter) {
        const variables = { ... this.graphQL.session, ... {order: order_by}, ... {where: where} }
        return this.graphQL.query<read_FeriadoConcessao>(FeriadoConcessaoSchema.read_FeriadoConcessao, variables);
    }

    updateFeriadoConcessao(feriado: FeriadoConcessao) {
        const feriadoConcessaoInput = { feriado: { ... feriado} , ...this.graphQL.session}
        return this.graphQL.mutation<update_FeriadoConcessao>(FeriadoConcessaoSchema.update_FeriadoConcessao, feriadoConcessaoInput);
    }

    deleteFeriadoConcessao(id: number) {
        return this.graphQL.mutation<delete_FeriadoConcessao>(FeriadoConcessaoSchema.delete_FeriadoConcessao, { id: id , ...this.graphQL.session} )
    }
}