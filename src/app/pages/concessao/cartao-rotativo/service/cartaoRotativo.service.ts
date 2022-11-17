import { Injectable } from '@angular/core';
import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';

import { ConcessaoCartaoRotativoSchema } from './cartaoRotativo.schema';
import { CartaoRotativo,
         CartaoRotativoData, 
         CartaoRotativoSort,
         CartaoRotativoFilter,
         create_CartaoRotativo, 
         read_CartaoRotativo, 
         update_CartaoRotativo, 
         delete_CartaoRotativo} from 'src/app/@core/data/concessao-cartaoRotativo';

@Injectable()
export class CartaoRotativoService extends CartaoRotativoData {

    constructor(private graphQL: GenericGraphQL) {
        super();
    }

    createCartaoRotativo(cartaoRotativo: CartaoRotativo) {
        const variables = { cartaoRotativo: { ... cartaoRotativo }, ... this.graphQL.session};
        return this.graphQL.mutation<create_CartaoRotativo>(ConcessaoCartaoRotativoSchema.create_Concessao_CartaoRotativo, variables)
    }

    readCartaoRotativo(order_by?: CartaoRotativoSort, where?: CartaoRotativoFilter) {
        const variables = { ... this.graphQL.session, ... {order: order_by}, ... {where: where} }
        return this.graphQL.query<read_CartaoRotativo>(ConcessaoCartaoRotativoSchema.read_Concessao_CartaoRotativo, variables);
    }

    updateCartaoRotativo(cartaoRotativo: CartaoRotativo) {
        const IdentificadorInput = { cartaoRotativo: { ... cartaoRotativo} , ...this.graphQL.session}
        return this.graphQL.mutation<update_CartaoRotativo>(ConcessaoCartaoRotativoSchema.update_Concessao_CartaoRotativo, IdentificadorInput);
    }

    deleteCartaoRotativo(id: number) {
        return this.graphQL.mutation<delete_CartaoRotativo>(ConcessaoCartaoRotativoSchema.delete_Concessao_CartaoRotativo, { id: id , ...this.graphQL.session} )
    }
}