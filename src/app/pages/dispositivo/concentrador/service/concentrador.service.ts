import { Injectable } from '@angular/core';
import { GenericGraphQL, SortOperationKind } from 'src/app/@core/api/generic-graphql';

import { ConcentradorDispositivoSchema } from './concentrador.schema';
import { ConcentradorDispositivoData, 
         ConcentradorDispositivo,
         ConcentradorDispositivoSort,
         ConcentradorDispositivoFilter,
         create_ConcentradorDispositivo, 
         read_ConcentradorDispositivo, 
         update_ConcentradorDispositivo, 
         delete_ConcentradorDispositivo} from 'src/app/@core/data/dispositivo-concentrador';
import { Item } from 'src/app/@theme/layouts/treeview/service/treeview';

@Injectable()
export class ConcentradorDispositivoService extends ConcentradorDispositivoData {

    constructor(private graphQL: GenericGraphQL) {
        super();
    }

    createConcentradorDispositivo(concentrador: ConcentradorDispositivo) {
        const variables = { concentrador: { ... concentrador }, ... this.graphQL.session};
        return this.graphQL.mutation<create_ConcentradorDispositivo>(ConcentradorDispositivoSchema.create_ConcentradorDispositivo, variables)
    }

    readConcentradorDispositivos(order_by?: ConcentradorDispositivoSort, where?: ConcentradorDispositivoFilter) {
        const variables = { ... this.graphQL.session, ... {order: order_by}, ... {where: where} }
        return this.graphQL.query<read_ConcentradorDispositivo>(ConcentradorDispositivoSchema.read_ConcentradorDispositivo, variables);
    }

    updateConcentradorDispositivo(concentrador: ConcentradorDispositivo) {
        const concentradorDispositivoInput = { concentrador: { ... concentrador} , ...this.graphQL.session}
        return this.graphQL.mutation<update_ConcentradorDispositivo>(ConcentradorDispositivoSchema.update_ConcentradorDispositivo, concentradorDispositivoInput);
    }

    deleteConcentradorDispositivo(id: number) {
        return this.graphQL.mutation<delete_ConcentradorDispositivo>(ConcentradorDispositivoSchema.delete_ConcentradorDispositivo, { id: id , ...this.graphQL.session} );
    }


    getConcentradorDispositivoTreeView(filter: ConcentradorDispositivoFilter): Item[] {
        let item: Item[] = [];
        const order_by: ConcentradorDispositivoSort = {nome: SortOperationKind.ASC}
        const variables = {... this.graphQL.session, ... {order:order_by}, ...{where:filter} }
        this.graphQL.query<read_ConcentradorDispositivo>(ConcentradorDispositivoSchema.read_ConcentradorDispositivo,variables)
            .subscribe(({ dispositivoConcentrador }: read_ConcentradorDispositivo) => {
                 dispositivoConcentrador.nodes.forEach((concetrador: ConcentradorDispositivo) => {
                     item.push({
                         id: concetrador.id.toString(),
                         text: concetrador.nome,
                         icon:"concentrador.svg"
                     })
                 })
            })

            return item;
    }



}