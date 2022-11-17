import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericGraphQL } from "src/app/@core/api/generic-graphql";
import { create_EstacaoDispositivo, delete_EstacaoDispositivo, EstacaoDispositivo, EstacaoDispositivoData, EstacaoDispositivoFilter, EstacaoDispositivoSort, read_EstacaoDispositivo, update_EstacaoDispositivo } from 'src/app/@core/data/dispositivo-estacao';
import { EstacaoDispositivoSchema } from './estacao.schema';

@Injectable()
export class EstacaoDispositivoService extends EstacaoDispositivoData {

    constructor(private graphQL: GenericGraphQL) {
        super();
    }

    createEstacaoDispositivo(estacao: EstacaoDispositivo) {
        const variables = { estacao: { ... estacao }, ... this.graphQL.session};
        return this.graphQL.mutation<create_EstacaoDispositivo>(EstacaoDispositivoSchema.create_EstacaoDispositivo,variables)
        
    }

    readEstacaoDispositivo(order: EstacaoDispositivoSort, where?: EstacaoDispositivoFilter) {
        const variables = { ... this.graphQL.session, ... {order: order}, ... {where: where} }
        return this.graphQL.query<read_EstacaoDispositivo>(EstacaoDispositivoSchema.read_EstacaoDispositivo, variables);
    }

    updateEstacaoDispositivo(estacao: EstacaoDispositivo)  {
        const estacaoDispositivoInput = { estacao: { ...estacao} , ...this.graphQL.session}
        return this.graphQL.mutation<update_EstacaoDispositivo>(EstacaoDispositivoSchema.update_EstacaoDispositivo, estacaoDispositivoInput)
    }

    deleteEstacaoDispositivo(id: number) {
        return this.graphQL.mutation<delete_EstacaoDispositivo>(EstacaoDispositivoSchema.delete_EstacaoDispositivo, { id:id , ...this.graphQL.session})
    }

}
