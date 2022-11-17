import { Injectable } from '@angular/core';
import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';

import { BloqueioDispositivoSchema } from './bloqueio.schema';
import { BloqueioDispositivoData, 
         BloqueioDispositivo,
         BloqueioDispositivoSort,
         BloqueioDispositivoFilter,
         create_BloqueioDispositivo, 
         read_BloqueioDispositivo, 
         update_BloqueioDispositivo, 
         delete_BloqueioDispositivo } from 'src/app/@core/data/dispositivo-bloqueio';

@Injectable()
export class BloqueioDispositivoService extends BloqueioDispositivoData {

    constructor(private graphQL: GenericGraphQL) {
        super();
    }

    createBloqueioDispositivo(bloqueio: BloqueioDispositivo) {
        const variables = { bloqueio: { ... bloqueio }, ... this.graphQL.session};
        return this.graphQL.mutation<create_BloqueioDispositivo>(BloqueioDispositivoSchema.create_BloqueioDispositivo, variables)
    }

    readBloqueioDispositivos(order_by?: BloqueioDispositivoSort, where?: BloqueioDispositivoFilter) {
        const variables = { ... this.graphQL.session, ... {order: order_by}, ... {where: where} }
        return this.graphQL.query<read_BloqueioDispositivo>(BloqueioDispositivoSchema.read_BloqueioDispositivo, variables);
    }

    updateBloqueioDispositivo(bloqueio: BloqueioDispositivo) {
        const bloqueioDispositivoInput = { bloqueio: { ... bloqueio} , ...this.graphQL.session}
        return this.graphQL.mutation<update_BloqueioDispositivo>(BloqueioDispositivoSchema.update_BloqueioDispositivo, bloqueioDispositivoInput);
    }

    deleteBloqueioDispositivo(id: number) {
        return this.graphQL.mutation<delete_BloqueioDispositivo>(BloqueioDispositivoSchema.delete_BloqueioDispositivo, { id: id , ...this.graphQL.session} )
    }
}