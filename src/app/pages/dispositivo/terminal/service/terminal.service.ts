import { Injectable } from '@angular/core';
import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';

import { TerminalDispositivoSchema } from './terminal.schema';
import { TerminalDispositivoData, 
         TerminalDispositivo,
         TerminalDispositivoSort,
         TerminalDispositivoFilter,
         create_TerminalDispositivo, 
         read_TerminalDispositivo, 
         update_TerminalDispositivo, 
         delete_TerminalDispositivo} from 'src/app/@core/data/dispositivo-terminal';

@Injectable()
export class TerminalDispositivoService extends TerminalDispositivoData {

    constructor(private graphQL: GenericGraphQL) {
        super();
    }

    createTerminalDispositivo(terminal: TerminalDispositivo) {
        const variables = { terminal: { ... terminal }, ... this.graphQL.session};
        return this.graphQL.mutation<create_TerminalDispositivo>(TerminalDispositivoSchema.create_TerminalDispositivo, variables)
    }

    readTerminalDispositivos(order_by?: TerminalDispositivoSort, where?: TerminalDispositivoFilter) {
        const variables = { ... this.graphQL.session, ... {order: order_by}, ... {where: where} }
        return this.graphQL.query<read_TerminalDispositivo>(TerminalDispositivoSchema.read_TerminalDispositivo, variables);
    }

    updateTerminalDispositivo(terminal: TerminalDispositivo) {
        const terminalDispositivoInput = { terminal: { ... terminal} , ...this.graphQL.session}
        return this.graphQL.mutation<update_TerminalDispositivo>(TerminalDispositivoSchema.update_TerminalDispositivo, terminalDispositivoInput);
    }

    deleteTerminalDispositivo(id: number) {
        return this.graphQL.mutation<delete_TerminalDispositivo>(TerminalDispositivoSchema.delete_TerminalDispositivo, { id: id , ...this.graphQL.session} )
    }
}