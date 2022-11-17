import { Injectable } from '@angular/core';
import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';

import { ElevadorDispositivoSchema } from './elevador.schema';
import { ElevadorDispositivoData, 
         ElevadorDispositivo,
         ElevadorDispositivoSort,
         ElevadorDispositivoFilter,
         create_ElevadorDispositivo, 
         read_ElevadorDispositivo, 
         update_ElevadorDispositivo, 
         delete_ElevadorDispositivo} from 'src/app/@core/data/dispositivo-elevador';




@Injectable()
export class ElevadorDispositivoService extends ElevadorDispositivoData {

    constructor(private graphQL: GenericGraphQL) {
        super();
    }

    createElevadorDispositivo(elevador: ElevadorDispositivo) {
        const variables = { elevador: { ... elevador }, ... this.graphQL.session};
        return this.graphQL.mutation<create_ElevadorDispositivo>(ElevadorDispositivoSchema.create_ElevadorDispositivo, variables)
    }

    readElevadorDispositivos(order_by?: ElevadorDispositivoSort, where?: ElevadorDispositivoFilter) {
        const variables = { ... this.graphQL.session, ... {order: order_by}, ... {where: where} }
        return this.graphQL.query<read_ElevadorDispositivo>(ElevadorDispositivoSchema.read_ElevadorDispositivo, variables);
    }

    updateElevadorDispositivo(elevador: ElevadorDispositivo) {
        const elevadorDispositivoInput = { elevador: { ... elevador} , ...this.graphQL.session}
        return this.graphQL.mutation<update_ElevadorDispositivo>(ElevadorDispositivoSchema.update_ElevadorDispositivo, elevadorDispositivoInput);
    }

    deleteElevadorDispositivo(id: number) {
        return this.graphQL.mutation<delete_ElevadorDispositivo>(ElevadorDispositivoSchema.delete_ElevadorDispositivo, { id: id , ...this.graphQL.session} )
    }


}

